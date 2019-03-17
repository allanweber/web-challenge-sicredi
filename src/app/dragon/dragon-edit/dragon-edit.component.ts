import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragonService } from '../services/dragon.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Dragon } from '../models/dragon.model';
import { Validators, FormBuilder } from '@angular/forms';
import { FeedbackMessageService } from 'src/app/shared/services/feedback-message.service';
import { IFormCanDeactivate } from 'src/app/core/iform-candeactivate';

@Component({
  selector: 'app-dragon-edit',
  templateUrl: './dragon-edit.component.html',
  styleUrls: ['./dragon-edit.component.css'],
})
export class DragonEditComponent
  implements OnInit, OnDestroy, IFormCanDeactivate {
  private serviceSubscription: Subscription;
  private routeSubscription: Subscription;
  private changedForm = false;

  public dragonId: string;
  public isEditing: boolean;
  public dragon: Dragon = new Dragon();

  public dragonForm = this.formBuilder.group({
    name: [null, Validators.required],
    type: [null, Validators.required],
    histories: [null, Validators.required],
  });

  constructor(
    private service: DragonService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: FeedbackMessageService,
  ) {}

  ngOnInit() {
    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      if (params.id && params.id !== 'new') {
        this.dragonId = params.id;
        this.isEditing = !this.activatedRoute.routeConfig.path.includes(
          'detail',
        );
        this.serviceSubscription = this.service
          .getDragon(this.dragonId)
          .subscribe(
            response => {
              this.dragon = response;
              this.setForm();
            },
            () => {
              this.router.navigate(['/']);
            },
          );
      } else {
        this.dragonId = null;
        this.isEditing = true;
      }
      this.setFormEdition();
    });
  }

  setForm() {
    this.dragonForm.get('name').setValue(this.dragon.name);
    this.dragonForm.get('type').setValue(this.dragon.type);
    this.dragonForm.get('histories').setValue(this.joinHistories());
  }

  setFormEdition() {
    if (!this.isEditing) {
      this.dragonForm.get('name').disable();
      this.dragonForm.get('type').disable();
      this.dragonForm.get('histories').disable();
    }
  }

  onSubmit() {
    this.changedForm = false;
    if (this.dragonId) {
      this.dragon.name = this.dragonForm.get('name').value;
      this.dragon.type = this.dragonForm.get('type').value;
      this.dragon.histories = this.getHistories();

      this.serviceSubscription = this.service
        .updateDragon(this.dragonId, this.dragon)
        .subscribe(() => {
          this.messageService.showSuccessMessage(
            `Dragão ${this.dragon.name} atualizado com sucesso.`,
          );
          this.router.navigate(['/']);
        });
    } else {
      const dragon: Dragon = {
        id: null,
        createdAt: new Date(),
        name: this.dragonForm.get('name').value,
        type: this.dragonForm.get('type').value,
        histories: this.getHistories(),
      };

      this.serviceSubscription = this.service
        .createDragon(dragon)
        .subscribe(() => {
          this.messageService.showSuccessMessage(
            `Dragão ${dragon.name} criado com sucesso.`,
          );
          this.router.navigate(['/']);
        });
    }
  }

  joinHistories(): any {
    if (this.dragon.histories.length < 1) {
      return '';
    }
    return this.dragon.histories.join('\n');
  }

  getHistories(): string[] {
    const histories = this.dragonForm.get('histories').value as string;
    const separators = ['\n', ';', '|'];
    const separated = histories.split(
      new RegExp('[' + separators.join('') + ']', 'g'),
    );
    return separated;
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  showError(controlName: string) {
    return (
      this.dragonForm.controls[controlName].dirty &&
      this.dragonForm.controls[controlName].hasError('required')
    );
  }

  onInput() {
    this.changedForm = true;
  }

  canDeactivate() {
    if (this.changedForm) {
      return confirm('Deseja sair sem salvar as alterações?');
    }

    return true;
  }
}

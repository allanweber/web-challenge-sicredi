import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DragonService } from '../services/dragon.service';
import { Dragon } from '../models/dragon.model';
import { FeedbackMessageService } from 'src/app/shared/services/feedback-message.service';

@Component({
  selector: 'app-dragon-list',
  templateUrl: './dragon-list.component.html',
  styleUrls: ['./dragon-list.component.css'],
})
export class DragonListComponent implements OnInit, OnDestroy {
  private serviceSubscription: Subscription;

  public dragons: Dragon[] = [];

  constructor(
    private service: DragonService,
    private feedback: FeedbackMessageService,
  ) {}

  ngOnInit() {
    this.loadDragons();
  }

  loadDragons() {
    this.serviceSubscription = this.service
      .getDragons()
      .subscribe(response => (this.dragons = response));
  }

  ngOnDestroy(): void {
    if (this.serviceSubscription) {
      this.serviceSubscription.unsubscribe();
    }
  }

  remove(dragon: Dragon) {
    if (confirm(`Tem certeza que deseja remover o dragão ${dragon.name}?`)) {
      this.serviceSubscription = this.service
        .deleteDragon(dragon.id)
        .subscribe(() => {
          this.feedback.showSuccessMessage(`Dragão ${dragon.name} removido com sucesso.`);
          this.loadDragons();
        });
    }
  }
}

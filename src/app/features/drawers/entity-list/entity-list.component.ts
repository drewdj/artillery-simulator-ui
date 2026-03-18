import { Component, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { Entity, MOCK_ENTITIES, EntityStatus } from '../../../shared/models/entity.model';

@Component({
  selector: 'app-entity-list',
  standalone: true,
  imports: [MatIcon, MatDivider, MatChipsModule],
  templateUrl: './entity-list.component.html',
  styleUrl: './entity-list.component.scss',
})
export class EntityListComponent {
  readonly entities = signal<Entity[]>(MOCK_ENTITIES);

  statusIcon(status: EntityStatus): string {
    const map: Record<EntityStatus, string> = {
      active: 'radio_button_checked',
      inactive: 'radio_button_unchecked',
      destroyed: 'cancel',
      unknown: 'help_outline',
    };
    return map[status];
  }

  statusLabel(status: EntityStatus): string {
    const map: Record<EntityStatus, string> = {
      active: 'Activo',
      inactive: 'Inactivo',
      destroyed: 'Destruido',
      unknown: 'Desconocido',
    };
    return map[status];
  }
}

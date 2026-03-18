import { Component, signal } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { MOCK_TREE, EntityTreeNode } from '../../../shared/models/entity.model';

@Component({
  selector: 'app-entity-tree',
  standalone: true,
  imports: [NgTemplateOutlet, MatIconButton, MatIcon, MatDivider],
  templateUrl: './entity-tree.component.html',
  styleUrl: './entity-tree.component.scss',
})
export class EntityTreeComponent {
  readonly treeData = signal<EntityTreeNode[]>(MOCK_TREE);
  readonly expandedNodes = signal<Set<string>>(new Set(['bn1', 'cia-a']));

  isExpanded(id: string): boolean {
    return this.expandedNodes().has(id);
  }

  toggleNode(id: string): void {
    const set = new Set(this.expandedNodes());
    if (set.has(id)) {
      set.delete(id);
    } else {
      set.add(id);
    }
    this.expandedNodes.set(set);
  }
}

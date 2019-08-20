//-- copyright
// OpenProject is a project management system.
// Copyright (C) 2012-2015 the OpenProject Foundation (OPF)
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License version 3.
//
// OpenProject is a fork of ChiliProject, which is a fork of Redmine. The copyright follows:
// Copyright (C) 2006-2013 Jean-Philippe Lang
// Copyright (C) 2010-2013 the ChiliProject Team
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
//
// See doc/COPYRIGHT.rdoc for more details.
//++

import {Directive, ElementRef, Input} from '@angular/core';
import {I18nService} from 'core-app/modules/common/i18n/i18n.service';

import {OpContextMenuTrigger} from 'core-components/op-context-menu/handlers/op-context-menu-trigger.directive';
import {OPContextMenuService} from 'core-components/op-context-menu/op-context-menu.service';
import {GridAreaService} from "core-app/modules/grids/grid/area.service";

@Directive({
  selector: '[gridRowContextMenu]'
})
export class GridRowContextMenu extends OpContextMenuTrigger {
  @Input('gridRowContextMenu-rowNumber') public rowNumber:number;

  constructor(readonly elementRef:ElementRef,
              readonly opContextMenu:OPContextMenuService,
              readonly I18n:I18nService,
              readonly layout:GridAreaService) {

    super(elementRef, opContextMenu);
  }

  protected open(evt:JQuery.TriggeredEvent) {
    this.buildItems();
    this.opContextMenu.show(this, evt);
  }

  public get locals() {
    return {
      items: this.items
    };
  }

  public positionArgs(openerEvent:JQuery.TriggeredEvent):any {
    return {
      my: 'left top',
      at: 'right top',
      of: this.$element,
      collision: 'flipfit'
    };
  }

  private buildItems() {
    let grid = this.layout;
    let rowNumber = this.rowNumber;

    let items = [
      {
        linkText: I18n.t('js.label_add_row_before'),
        onClick: () => {
          grid.addRow(rowNumber - 1);
          return true;
        }
      },
      {
        linkText: I18n.t('js.label_add_row_after'),
        onClick: () => {
          grid.addRow(rowNumber);
          return true;
        }
      }
    ];

    if (grid.numRows > 1) {
      items.push(
        {
          linkText: I18n.t('js.label_remove_row'),
          onClick: () => {
            grid.removeRow(rowNumber);
            return true;
          }
        }
      );
    }

    this.items = items;
  }
}


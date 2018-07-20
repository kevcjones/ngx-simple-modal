
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOption } from 'ng-select';

@Injectable()
export class OptionService {

  private static readonly PLAYER_ONE: Array<IOption> = [
    { value: '0', label: 'Aech' },
    { value: '1', label: 'Art3mis' },
    { value: '2', label: 'Daito' },
    { value: '3', label: 'Parzival' },
    { value: '4', label: 'Shoto' }
  ];

  getCharacters(): Array<IOption> {
    return this.cloneOptions(OptionService.PLAYER_ONE);
  }

  loadCharacters(): Observable<Array<IOption>> {
    return this.loadOptions(OptionService.PLAYER_ONE);
  }

  private loadOptions(options: Array<IOption>): Observable<Array<IOption>> {
    return new Observable((obs) => {
      setTimeout(() => {
        obs.next(this.cloneOptions(options));
        obs.complete();
      }, 5000);
    });
  }

  private cloneOptions(options: Array<IOption>): Array<IOption> {
    return options.map(option => ({
      value: option.value,
      label: option.label
    }));
  }
}

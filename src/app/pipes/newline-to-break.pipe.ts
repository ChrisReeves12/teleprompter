import { DomSanitizer } from "@angular/platform-browser";
import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'newlineToBreak'
})
export class NewlineToBreakPipe implements PipeTransform {

  constructor(private readonly _domSanitizer: DomSanitizer) {
  }

  transform(value: string): string {
    const returnValue = value.replace(/\n/g, '<br />');
    return this._domSanitizer.bypassSecurityTrustHtml(returnValue) as string;
  }
}

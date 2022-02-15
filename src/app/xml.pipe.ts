import { Pipe, PipeTransform } from '@angular/core';
import {xml} from 'vkbeautify'

@Pipe({
  name: 'xml'
})
export class XmlPipe implements PipeTransform {

  transform(value: string): string {
    return xml(value);
}

}

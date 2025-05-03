import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, inject, signal } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-add-ingredient',
  templateUrl: './add-ingredient.component.html',
  styleUrl: './add-ingredient.component.scss'
})
export class AddIngredientComponent {
  
  readonly templateKeywords = signal([]);

  announcer = inject(LiveAnnouncer);

  constructor(){}

  ngOnInit(){

  }


  removeTemplateKeyword(keyword: string) {
    this.templateKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from template form`);
      return [...keywords];
    });
  }

  addTemplateKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our keyword
    if (value) {
      this.templateKeywords.update(keywords => [...keywords, value]);
      this.announcer.announce(`added ${value} to template form`);
      
    }
    console.log(this.templateKeywords())
    
    // Clear the input value
    event.chipInput!.clear();
  }
}

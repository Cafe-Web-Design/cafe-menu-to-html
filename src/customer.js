import {clean,lines,selected,requireText,number,pence,pounds,section,report,enumValue,webAddress} from './customer-ui.js';
export const config = {
  "title": "Cafe Menu Builder",
  "short": "Your menu, neatly served",
  "audience": "For independent cafe owners",
  "summary": "Turn your dishes, drinks and prices into a readable menu you can check, copy and print.",
  "button": "Build my menu",
  "filename": "cafe-menu",
  "eyebrow": "Good food deserves a clear menu.",
  "time": "Start with one item",
  "outcome": "A clean menu preview and a text file you can give to your website designer.",
  "layout": "menu",
  "intro": "Add what you actually serve. Group items into sections such as Coffee, Breakfast or Lunch. Add more items when you are ready.",
  "note": "Only use dietary and allergen wording your cafe has checked. The tool does not identify allergens or verify food information.",
  "fields": [
    {
      "id": "business",
      "label": "Cafe name",
      "help": "",
      "required": true,
      "type": "text",
      "maxLength": 180
    },
    {
      "id": "hours",
      "label": "When is this menu served?",
      "help": "For example: Breakfast, 8am to 11am. Optional.",
      "required": false,
      "type": "text",
      "maxLength": 180
    }
  ],
  "repeat": {
    "itemLabel": "Menu item",
    "max": 40,
    "fields": [
      {
        "id": "category",
        "label": "Menu section",
        "help": "For example: Coffee or Lunch.",
        "required": true,
        "type": "text",
        "maxLength": 180
      },
      {
        "id": "name",
        "label": "Item name",
        "help": "",
        "required": true,
        "type": "text",
        "maxLength": 180
      },
      {
        "id": "price",
        "label": "Price (£)",
        "help": "In pounds, for example 4.50. Do not include the £ sign.",
        "required": true,
        "type": "text",
        "maxLength": 180,
        "inputmode": "decimal"
      },
      {
        "id": "description",
        "label": "Description",
        "help": "Optional. A short, appetising description.",
        "required": false,
        "type": "textarea",
        "maxLength": 2500,
        "wide": true
      },
      {
        "id": "note",
        "label": "Approved dietary note",
        "help": "Optional. Only wording you have verified.",
        "required": false,
        "type": "text",
        "maxLength": 180
      },
      {
        "id": "availability",
        "label": "Availability note",
        "help": "Optional, for example: Weekdays only.",
        "required": false,
        "type": "text",
        "maxLength": 180
      }
    ]
  },
  "example": {
    "business": "Example Corner Cafe",
    "hours": "Breakfast until 11am. Coffee all day.",
    "rows": [
      {
        "category": "Coffee",
        "name": "Flat white",
        "price": "3.20",
        "description": "A double espresso with steamed milk.",
        "note": "",
        "availability": ""
      },
      {
        "category": "Breakfast",
        "name": "Mushrooms on toast",
        "price": "7.50",
        "description": "Garlic mushrooms, sourdough and fresh herbs.",
        "note": "Ask the team about allergens.",
        "availability": "Served until 11am"
      }
    ]
  }
};
export function evaluate(v){const name=requireText(v.business,'your cafe name');if(!v.rows?.length||v.rows.length>40)throw Error('Add between 1 and 40 menu items.');const menu=v.rows.map((i,n)=>({category:requireText(i.category,'the section for item '+(n+1)),name:requireText(i.name,'the name of item '+(n+1)),price:pounds(pence(i.price)),description:clean(i.description),note:clean(i.note),availability:clean(i.availability)}));return report(name,clean(v.hours)||'Menu preview. Check all details before publishing.',[section('Before sharing',['Confirm prices, serving times and availability.','Have the cafe approve every dietary or allergen note. No dietary labels have been inferred.'])],{menu});}

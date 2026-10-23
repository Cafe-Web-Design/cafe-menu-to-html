import {array,text,unique,money,amount,date,escape,note} from './util.js';
export const guide='Supply cafe, updatedOn (YYYY-MM-DD), currency (GBP) and items with id, category, item, description, price, available and dietary_note. Prices are decimal strings; blank means confirm. Dietary notes are never inferred.';
export function analyse(input){
 text(input.cafe,'cafe');date(input.updatedOn,'updatedOn');if(input.currency!=='GBP')throw Error('First release supports GBP');
 const items=unique(array(input.items,'items'),'id').map(row=>{
  text(row.category,'category');text(row.item,'item');if(typeof row.available!=='boolean')throw Error('available must be boolean');
  const price=row.price===''?'Price to confirm':money(row.price,input.currency);if(row.price!=='')amount(row.price);
  return {...row,priceDisplay:price};
 });
 const groups=[...new Set(items.map(x=>x.category))].map(category=>({category,items:items.filter(x=>x.category===category)}));
 return {title:input.cafe+' menu',summary:'Approved input last updated '+input.updatedOn+'. Dietary information is supplied by the cafe.',groups,issues:[],markdown:groups.map(g=>'## '+g.category+'\n\n'+g.items.map(i=>'- '+i.item+': '+i.priceDisplay+(i.available?'':' (Currently unavailable)')+(i.dietary_note?'; '+i.dietary_note:'')).join('\n')).join('\n\n')};
}
export const render=r=>'<h2>'+escape(r.title)+'</h2><p>'+escape(r.summary)+'</p><div class="grid">'+r.groups.map(g=>'<section class="card"><h3>'+escape(g.category)+'</h3><ul>'+g.items.map(i=>'<li><strong>'+escape(i.item)+'</strong><br><span class="price">'+escape(i.priceDisplay)+'</span><p>'+escape(i.description)+'</p>'+(i.available?'':'<p class="badge">Currently unavailable</p>')+(i.dietary_note?'<p>'+escape(i.dietary_note)+'</p>':'')+'</li>').join('')+'</ul></section>').join('')+'</div>'+note('Ask the cafe','Speak to the business about dietary needs. This formatter does not check food safety.');

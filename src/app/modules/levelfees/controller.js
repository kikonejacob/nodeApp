import debug from 'utils/debug.js';
import stringRes from 'utils/stringRes';
import List from './containers/list';
import DeleteList from './containers/delete';
import Form from './containers/form';
import servicesChannels from 'services/servicesChannels';
import PageableCollection from 'utils/pageableCollection';
import React from 'react';
import RestData from 'utils/restdata';

const API_URL='../api/levels/:id/fees';
const FORM_TITLE='Fees';
const LIST_TITLE='Fees list';



export default  class schoolInfo {

handleSubmit(e,data,action){

    let services = servicesChannels('services');
    console.log(data);

    switch(action)
    {
    case 'cancel':
        services.trigger('routeBack');
        break;

    case 'submit':
        services.trigger('routeBack');


    }

};

handleActions(e,action){

    switch (action){
    case 'delete':

        this.handleDelete(action) ;
        break;


    }


}

handleDelete(){//to do: find a way to


    let confirmResult=confirm('Are you sure you want to delete these items ?');
    if (confirmResult==true)
    {

        console.log(this.selectedIds);

        console.log( this.Rendered.type.getdata());
    }


}

constructor(){

    this.services = servicesChannels('services');
    debug.log('creating feeheads controller..');

    this.title = stringRes.studentBasic;

    this.current = null;

};
/**
 * @levelid
 */
index(options)
{

    let url=API_URL;
    url=url.replace(':id',options[0]);
   
    this.services.trigger('change-title',LIST_TITLE);
    let collection=new PageableCollection({url:url});
    let Rendered=(<List  collection={collection} uniqueID='code'/>);

    this.services.trigger('load-content',Rendered,'react');


}
delete(){

    this.selectedIds=[];
    let  collection=new PageableCollection({url:API_URL});
    let header={ description:'select the levels you want to delete and click on delete',
                 onAction:this.handleActions.bind(this)};
    this.Rendered=(<DeleteList {...header} collection={collection}
                         multiselect={true} selectedIds={this.selectedIds} />);
    this.services.trigger('load-content',this.Rendered,'react');



}

create(){


    let data={};

    return(<div> <Form data={data} onSubmitForm={this.handleSubmit}  />  </div>);


}
/**
 * [show description]
 * @levelid  
 * @id
 * @return {[type]}         [description]
 */
show(options){


    let apiurl=API_URL;
    apiurl=apiurl.replace(':id',options[0]);

    this.current=options[1];

    let services=this.services;
    this.services.trigger('change-title',FORM_TITLE);
  
    this.model=new RestData({
        channel:'student.info',
        url:apiurl+'/'+this.current

    });
     
    this.model.get().done(function(response){

        debug.log(response.data);

        let Rendered=(<Form  data={response.data} onSubmitForm={this.handleSubmit} />);

        services.trigger('load-content',Rendered,'react');      

    }.bind(this));
}
configure(){

}


}
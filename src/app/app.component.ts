import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import PouchDB from 'node_modules/pouchdb';

import PouchDBFind from 'node_modules/pouchdb-find';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  pouchdb: any;
  result: any;


  constructor(private formBuilder: FormBuilder) {


    this.pouchdb = new PouchDB("pouchform");

    PouchDB.plugin(PouchDBFind);

    this.pouchdb.createIndex(
      {

        index: { fields: ['name'] }
      }
    );

  }



  async search() {



    let records = await this.getForms(this.pouchform.value.searchName);

    this.result = records.docs;


  }


  getForms(searchName) {


    return this.pouchdb.find(

      {
        selector: {
          name: searchName
        }
      }
    )

  }



  saveForm() {

    var pouchform = {

      _id: new Date().toISOString(),
      name: this.pouchform.value.name,
      emailid: this.pouchform.value.emailid,

    }


    this.pouchdb.put(pouchform, function (result, error) {

      console.log(result);

      if (!error) {

        alert("Pouch form saved successfully")
      }
    }
    )
  }

  pouchform = this.formBuilder.group(

    {
      name: '',
      emailid: '',
      searchName: '',

    }
  )
}

import * as React from 'react';
import styles from './GiftRegistration.module.scss';
import { IGiftRegistrationProps } from './IGiftRegistrationProps';
import { Dropdown,IDropdownStyles,IDropdownOption} from 'office-ui-fabric-react/lib/Dropdown';

import {PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
//import { DateTimePicker, DateConvention } from '@pnp/spfx-controls-react/lib/dateTimePicker';  

import { Checkbox} from 'office-ui-fabric-react/lib/Checkbox'; 

 

import { DatePicker } from 'office-ui-fabric-react/lib/DatePicker';

import {Stack,IStackStyles,StackItem,IChoiceGroupOption} from 'office-ui-fabric-react'; 

import {Icon} from 'office-ui-fabric-react/lib/Icon';

import Service from './Service1';
const stackTokens = { childrenGap: 50 };

const drpYesorNo:IDropdownOption[]=[  { key: "Yes", text: "Yes"},  { key: "No", text: "No" }];  

const drpRiskReviewOptions:IDropdownOption[]=[  { key: "Yes", text: "Yes"  },  { key: "No", text: "No" }];  



const stackTokens1 = { childrenGap: 80 };

const stackButtonStyles: Partial<IStackStyles> = { root: { width: 20 } };

const stackStyles: Partial<IStackStyles> = { root: { padding: 10} };

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 300 },
};

 

//const choiceValues: string[] =['(I have reviewed the submitted Gift/Entertainment)'];

//let RootUrl = '';

let Envval='';

let ReviewerName='';

let RecordId='';

let RequestType='';

let itemId='';

let CountryName='';

//let CurrencyValue='';

let CurrencyValue1='';

var  MySelectedVal:any;

export interface IGiftRegistartion
{
  
  yourName:any;
  yourTitle:any;
  FromCompany:any;
  BussinessUnitItems:any;
  CurrencyListItems:any;
  MyBussinessUnitValue:any;
  MyCurrencyvalue:any;
  GiftRegistrationItems:any;
  MyGiftRegistrationValue:any;
  divhide:any;
  FromName:any;
  ISPEP:any;
  
  FromTitle:any;
  FromAddress:any;
  Valueofgift:any;
  descofgit:any;
  Recevingpart:any;
  dtgiftrecieved:any;
  businesspurposegift:any;
  addcommentsrecived:any;
  FileValuerecived:any;
  disableFileUploadrecived:boolean;

  Givename:any;
  ISPEPGiven:any;
  GivenCompany:any;
  GivenTitle:any;
  GivenAddress:any;


  ValueofGiftgiven:any;
  CurrencyListItemsGiven:any;
  MyCurrencyvalueGiven:any;

  descofgitgiven:any;
  Givingparty:any;
  dtgiftgiven:any;

  businesspurposegiftgiven:any;
  addcommentsgiven:any;
  FileValuegiven:any;
  disableFileUploadGiven:any;
  MyYesnoRecived:any;
  MyYesnoGiven:any;

  businesspurposegiftrecived:any;
  userval:any;
  userval1:any;


  ReviewerNameId:any;
  myRiskoptions:any;
  mypolicyStatndards:any;
  signoffNameId:any;
  ApproverExsits:boolean;

  AttachmentFiles:any;

  choiceValues: string[];
  Mycheckbox:boolean;
  ReqCurrval:String;
  ReviewerComments:string;

  divhidemonth:boolean;

}


export default class GiftRegistration extends React.Component<IGiftRegistrationProps, IGiftRegistartion> {
  
  public _service: any;
  public GlobalService1: any;
  protected ppl:any;

  public constructor(props:IGiftRegistrationProps) {

    super(props);

    this.state={

      
      yourName:"",
      yourTitle:"",
      BussinessUnitItems:[],
      MyBussinessUnitValue:"",
      GiftRegistrationItems:[],
      CurrencyListItems:[],
     MyGiftRegistrationValue:"",
     divhide:"",
     FromName:"",
     ISPEP:"",
     FromCompany:"",
     FromTitle:"",
     FromAddress:"",
     Valueofgift:"",
     MyCurrencyvalue:"",
     descofgit:"",
     Recevingpart:"",
     dtgiftrecieved:"",
     businesspurposegift:"",
     addcommentsrecived:"",
     FileValuerecived:[],
     disableFileUploadrecived:false,

     Givename:"",
     ISPEPGiven:"",
     GivenCompany:"",
     GivenTitle:"",
     GivenAddress:"",
     ValueofGiftgiven:"",

     CurrencyListItemsGiven:[],
     MyCurrencyvalueGiven:"",
     descofgitgiven:"",
     Givingparty:"",
     dtgiftgiven:"",

     businesspurposegiftgiven:"",
     addcommentsgiven:"",
     FileValuegiven:[],
     disableFileUploadGiven:false,
     MyYesnoRecived:"",
     MyYesnoGiven:"",

     businesspurposegiftrecived:"",
     userval:[],
     ReviewerNameId:[],

     myRiskoptions:"",
     mypolicyStatndards:"",
     signoffNameId:[],
     userval1:[],
     ApproverExsits:false,
     AttachmentFiles:[],
     choiceValues:[],
     Mycheckbox:false,
     ReqCurrval:"",
     ReviewerComments:"",
     divhidemonth:false

     };

     //RootUrl = this.props.url;

   
     this._service = new Service(this.props.url, this.props.context);
    
     this.GlobalService1 = new Service(this.props.url, this.props.context);

     this.GetEnvironment();

     
     itemId = this.getParam('SID');

     RequestType = this.getParam1('Request');
     
     this.GetData();
   
    }

    public async GetData()
    {

      this.getApproverGrouporNot();

      if(itemId=='')
      {

        this.GetAllBussinessUnits();
        this.GetAllgiftregistries();
        this.GetAllCurrencies();
        this.GetAllCurrenciesGiven();
   
      }

      //Pending  && this.state.ApproverExsits==true
            
      else if(itemId!="" && RequestType=='Received')
      {
     
       this.getuserrecordsRecived();

       
       this.GetAllBussinessUnits();
       this.GetAllgiftregistries();
       this.GetAllCurrencies();
       this.GetAllCurrenciesGiven();
  
      }

      //Pending && this.state.ApproverExsits==true
  
      else if(itemId!="" && RequestType=='Given')
      {
  
        this.getuserrecordsGiven();

        
        this.GetAllBussinessUnits();
        this.GetAllgiftregistries();
        this.GetAllCurrencies();
        this.GetAllCurrenciesGiven();
  
      }

      //Pending && this.state.ApproverExsits==false

  //     else if(itemId!="" && RequestType!=''&& this.state.ApproverExsits==false)
  //     {
  // //Need to change here

  // //    alert('you dont have permissions to approve the record');

  // this.getuserrecordsRecived();
  
  // this.GetAllBussinessUnits();
  // this.GetAllgiftregistries();
  // this.GetAllCurrencies();
  // this.GetAllCurrenciesGiven();

  //     }

    }
   
    
    private  handleChange2() {
      this.setState({
        Mycheckbox: !this.state.Mycheckbox})

        if(this.state.Mycheckbox)
        {

        this.setState({divhidemonth: false})

        }

        else
        {

          this.setState({divhidemonth: true})
        }
    }
    
  
    public async getuserrecordsRecived()
    {
  
      let myitemId = this.getParam('SID');
      RequestType = this.getParam1('Request');

      RecordId=myitemId;
      let ItemInfo = await this._service.getItemByIDRecived(RecordId);
      this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})
  
      console.log(ItemInfo);
  
    if (ItemInfo.Title != '' && ItemInfo.Status=='Pending') 
    {

        this.setState({yourName: ItemInfo.YourName })

        this.setState({yourTitle: ItemInfo.YourTitle })

        this.setState({MyBussinessUnitValue:ItemInfo.CountryId})

        this.setState({MyGiftRegistrationValue:'Received Request'})

      //problem
       this.setState({MyYesnoRecived: ItemInfo.IsGiveraPEP})



       console.log(drpYesorNo);

      //region2
      this.setState({FromName:ItemInfo.FromName});
     //Problem2
      this.setState({FromCompany:ItemInfo.FromCompany});
      this.setState({FromTitle:ItemInfo.FromTitle});
      this.setState({FromAddress:ItemInfo.FromAddress});
      //endregion

      //region3

      this.setState({Valueofgift:ItemInfo.ValueofGift});
      this.setState({MyCurrencyvalue:ItemInfo.CurrencyofGiftReceivedId});
      this.setState({descofgit:ItemInfo.DescriptionofGift});
      this.setState({Recevingpart:ItemInfo.ReceivingParty});
     let strdoj= ItemInfo.DateGiftWasReceived.split('T');
     strdoj[0].replace("-","/");
    let mainstr=strdoj[0].replace("-","/");
    let strToDate = new Date(mainstr);
    this.setState({dtgiftrecieved:strToDate})

    //endregion

    //region4
  
    this.setState({businesspurposegiftrecived:ItemInfo.BusinessPurposeofGift});
    //problem
    this.setState({addcommentsrecived:ItemInfo.AdditionalCommentsforGift});

    this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})

    this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})

    this.setState({MyGiftRegistrationValue:ItemInfo.GiftRegistryId})

    //end region




  
      }

      else
      {

        this.GetEnvironment();

        alert('The record is already approved');

        window.location.replace(Envval);
        
      }
  
    }

    public async getuserrecordsGiven()
    {

      let myitemId = this.getParam('SID');
      RequestType = this.getParam1('Request');

      RecordId=myitemId;
  
     let ItemInfo = await this._service.getItemByIDGiven(RecordId);
      this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})
  
      console.log(ItemInfo);
  
      if (ItemInfo.Title != '' && ItemInfo.Status=='Pending') 
      
      {

        //region1

       this.setState({yourName: ItemInfo.YourName })
       this.setState({yourTitle: ItemInfo.YourTitle })
       this.setState({MyBussinessUnitValue:ItemInfo.CountryId})
       //problem
       this.setState({MyGiftRegistrationValue:'Given Request'})
       this.setState({MyYesnoGiven:ItemInfo.IsGiveraPEP})
      //endregion

      //region2
      this.setState({Givename:ItemInfo.Name});
      //Problem
      this.setState({MyYesnoGiven:ItemInfo.EntertainmentgiventoPEP});
      this.setState({GivenCompany:ItemInfo.Company});
      this.setState({GivenTitle:ItemInfo.TitleforGivenGift});
      this.setState({GivenAddress:ItemInfo.Address});
      //endregion
     
      //region3

      this.setState({ValueofGiftgiven:ItemInfo.ValueofGift});
      this.setState({MyCurrencyvalueGiven:ItemInfo.CurrencyofGiftId});
      this.setState({descofgitgiven:ItemInfo.DescriptionofGift});
      this.setState({Givingparty:ItemInfo.GivingParty});

     let strdoj= ItemInfo.DateGiftWasGiven.split('T');
     strdoj[0].replace("-","/");
     let mainstr=strdoj[0].replace("-","/");
     let strToDate = new Date(mainstr);
     this.setState({dtgiftgiven:strToDate})

      //endregion

      //region4

      this.setState({businesspurposegiftgiven:ItemInfo.BusinessPurposeofGift});

      this.setState({addcommentsgiven:ItemInfo.AdditionalCommentsforGift});
      
      this.setState({AttachmentFiles:ItemInfo.AttachmentFiles})

      this.setState({MyGiftRegistrationValue:ItemInfo.GiftRegistryId})

      //endregion
        
  
      }

      else
      {

        alert('The record is already approved');
        this.GetEnvironment();
        window.location.replace(Envval);
      }
  
    }

    public async GetEnvironment()
    {
  
      var data = await this._service.getEnvironment();
  
      console.log(data);
  
      var AllEnvironments: any = [];
  
      for (var k in data) {
  
        AllEnvironments.push({ key: data[k].ID, text: data[k].Title});
  
        Envval=data[0].Title;
      }
  
     
    }

    public async _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {  
      console.log("");
  }  

    
    private changeYourname(data: any): void {

      this.setState({ yourName: data.target.value });

    }

    private changeYourTitle(data: any): void {

      this.setState({ yourTitle: data.target.value });

    }

    private changeAddress(data: any): void {

      this.setState({ FromAddress: data.target.value });

    }

    private changeGivenAddress(data: any): void {

      this.setState({ GivenAddress: data.target.value });

    }

    private changecommentsrecived(data: any): void {

      this.setState({ addcommentsrecived: data.target.value });


    }

    private changeReviewrcomments(data: any): void {

      this.setState({ ReviewerComments: data.target.value });


    }

     
    private hadleBussinessUnit(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ MyBussinessUnitValue:item.key });

      CountryName=item.text;

      console.log(CountryName);
  
      
    }

    public async GetAllBussinessUnits() {

   
    
      var data = await this._service.GetAllBussinessUnits();
  
      console.log(data);
  
      var AllBussinessUnits: any = [];
  
      for (var k in data) {
  
        AllBussinessUnits.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllBussinessUnits);
  
      
     this.setState({ BussinessUnitItems: AllBussinessUnits });
    
  
    }


     private hadleGiftRegistry(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
    this.setState({ MyGiftRegistrationValue:item.key });

    MySelectedVal=item.key;

   
    if(item.key=='1')
      {
        this.setState({divhide:'Gave'})
      }
      else
      {

     
      this.setState({divhide:'receive'})
      }
  
      
    }

    public async GetAllgiftregistries() {

   
    
      var data = await this._service.GetAllgiftregistries();
  
      console.log(data);
  
      var AllGiftRegistries: any = [];
  
      for (var k in data) {
  
        AllGiftRegistries.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllGiftRegistries);
  
      
     this.setState({ GiftRegistrationItems: AllGiftRegistries });
    
  
    }

    public handlgiftrecivedDateChange = (date: any) => {

      this.setState({ dtgiftrecieved: date });

      
  
      }

    public handlgiftgivenDateChange = (date: any) => {

        this.setState({ dtgiftgiven: date });

        
    
       }


    private hadleCurrency(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ MyCurrencyvalue:item.key });

      CurrencyValue:item.text;

      this.setState({ReqCurrval:item.text});

    
  
      
    }

    private hadleYesNoRecived(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ MyYesnoRecived:item.key });
  
      
    }

    private hadleYesNoGiven(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    this.setState({ MyYesnoGiven:item.key });
  
      
    }

    private hadleRiskYesNoGiven(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

      this.setState({ myRiskoptions:item.key });
    
        
      }


      public async getApproverGrouporNot() {
        let mycurgroup= await this._service.getCurrentUserSiteGroups();
         console.log(mycurgroup.length);
         for (let grpcount = 0; grpcount < mycurgroup.length; grpcount++) {
      
          if(mycurgroup[grpcount].Title=='Approvers')
          {
      
            this.setState({ ApproverExsits: true });

            
           
      
          }

        }
      }
   

    public async GetAllCurrencies() {

   
    
      var data = await this._service.GetAllCurrencies();
  
      console.log(data);
  
      var AllCurrencies: any = [];
  
      for (var k in data) {
  
        AllCurrencies.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllCurrencies);
  
      
     this.setState({ CurrencyListItems: AllCurrencies });
    
  
    }


    private hadleCurrencyGiven(event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    
      this.setState({ MyCurrencyvalueGiven:item.key });

      CurrencyValue1=item.text;

      
  
      
    }

    public async GetAllCurrenciesGiven() {

   
    
      var data = await this._service.GetAllCurrencies();
  
      console.log(data);
  
      var AllCurrenciesGiven: any = [];
  
      for (var k in data) {
  
        AllCurrenciesGiven.push({ key: data[k].ID, text: data[k].Title});
      }
  
      console.log(AllCurrenciesGiven);
  
      
     this.setState({ CurrencyListItemsGiven: AllCurrenciesGiven });
    
  
    }


    private changeFromname(data: any): void {

      this.setState({ FromName: data.target.value });

    }

    private changeGivenname(data: any): void {

      this.setState({ Givename: data.target.value });

    }


    private changeFromcomapny(data: any): void {

      this.setState({ FromCompany: data.target.value });

    }

    private changeGivencomapny(data: any): void {

      this.setState({ GivenCompany: data.target.value });

    }

    private changeValueofgift(data: any): void {

      this.setState({ Valueofgift: data.target.value });

    }

    private changeValueofgiftGiven(data: any): void {

      this.setState({ ValueofGiftgiven: data.target.value });

    }

    
    private changeFromTitle(data: any): void {

      this.setState({ FromTitle: data.target.value });

    }

    private changeGivenTitle(data: any): void {

      this.setState({ GivenTitle: data.target.value });

    }

    public changeISPEP=async(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): Promise<void>=> {  

      this.setState({  

        ISPEP: option.key  
  
        });  

      }

      public changeGivenISPEP=async(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): Promise<void>=> {  

        this.setState({  
  
          ISPEPGiven: option.key  
    
          });  
  
        }

      private changedescofgift(data: any): void {

        this.setState({ descofgit: data.target.value });
  
      }

      private changedescofgiftgiven(data: any): void {

        this.setState({ descofgitgiven: data.target.value });
  
      }

      private changeRecevingParty(data: any): void {

        this.setState({ Recevingpart: data.target.value });
  
      }

      private changeGivingParty(data: any): void {

        this.setState({ Givingparty: data.target.value });
  
      }
    

      private changeBusinesspurposegiftrecived(data: any): void {

        this.setState({ businesspurposegiftrecived: data.target.value });
  
      }

      private changeBusinesspurposegiftGiven(data: any): void {

        this.setState({ businesspurposegiftgiven: data.target.value });
  
      }

     
      private changeAddcommentsgiven(data: any): void {

        this.setState({ addcommentsgiven: data.target.value });
  
      }

      private changeFileuploadRecived(data: any) {

        let LocalFileVal= this.state.FileValuerecived;
        
         LocalFileVal.push(data.target.files[0]);
        
        
        this.setState({FileValuerecived:LocalFileVal});
        
        if(this.state.FileValuerecived.length>5)
        {
        this.setState({disableFileUploadrecived:true});
        
        }
        
        
        }

        private changeFileuploadRecived1(data: any) {

          let LocalFileVal= this.state.FileValuegiven;
          
           LocalFileVal.push(data.target.files[0]);
          
          
          this.setState({FileValuegiven:LocalFileVal});
          
          if(this.state.FileValuegiven.length>5)
          {
          this.setState({disableFileUploadGiven:true});
          
          }
          
          
          }

      
    private _removeItemFromDetailrecived(Item: any) {
      console.log("itemId: " + Item.name); 
    
     let localFileValues=[];
    
     localFileValues=this.state.FileValuerecived;
    
     if(localFileValues.length==1)
     {
    
      localFileValues=[];
     }
    
    
      for(var count=0;count<localFileValues.length;count++)
      {
    
        if(localFileValues[count].name==Item.name)
          {
            let Index=count;
    
            localFileValues.splice(Index,count);
    
          }
    
      }
    
      this.setState({FileValuerecived:localFileValues,disableFileUploadrecived:false});
    
    
    }

    private _removeItemFromDetailrecived1(Item: any) {
      console.log("itemId: " + Item.name); 
    
     let localFileValues=[];
    
     localFileValues=this.state.FileValuegiven;
    
     if(localFileValues.length==1)
     {
    
      localFileValues=[];
     }
    
    
      for(var count=0;count<localFileValues.length;count++)
      {
    
        if(localFileValues[count].name==Item.name)
          {
            let Index=count;
    
            localFileValues.splice(Index,count);
    
          }
    
      }
    
      this.setState({FileValuegiven:localFileValues,disableFileUploadGiven:false});
    
    
    }

    private _onFormatDate = (date: Date): string => {
      return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

     
  };

  private _onSelectDate = (date: Date | null | undefined): void => {
    this.setState({ dtgiftrecieved: date });
   
   
};

private _onFormatDate1 = (date: Date): string => {
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();


};

private _onSelectDate1 = (date: Date | null | undefined): void => {
this.setState({ dtgiftgiven: date });


};

private async _getPeoplePickerItems(items: any[]) {
  console.log('Items:', items);

  if(items.length>0)
  {

    ReviewerName = items[0].text;

    let userInfo = this._service.getUserByLogin(items[0].loginName).then((info:any)=>{
    this.setState({ReviewerNameId:info});
    console.log(userInfo)
    console.log(ReviewerName)
    
});

  }

  else
  {

    this.setState({ReviewerNameId:null});
  }



}

private async _getPeoplePickerItems1(items: any[]) {
  console.log('Items:', items);

  if(items.length>0)
  {

    ReviewerName = items[0].text;

    let userInfo = this._service.getUserByLogin(items[0].loginName).then((info:any)=>{
    this.setState({signoffNameId:info});
    console.log(userInfo);
    console.log(userInfo);
});

  }

  else
  {

    this.setState({ReviewerNameId:null});
  }

  //this.ppl.onChange([]);

}

public  getParam( name:any )
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec(window.location.href);
 if( results == null )
 return "";
 else
 return results[1];
}

public  getParam1( name:any )
{
 name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
 var regexS = "[\\?&]"+name+"=([^&#]*)";
 var regex = new RegExp( regexS );
 var results = regex.exec(window.location.href);
 if( results == null )
 return "";
 else
 return results[1];
}

    private OnBtnClick():void{

     
      if(this.state.yourName=='')
      {

        alert('Please enter your name')
      }

      else if(this.state.yourTitle=='')
      {

        alert('Please enter your Title')
      }

      else if(this.state.MyBussinessUnitValue=='')
      {

        alert('Please select bussiness unit')
      }

      else if(this.state.MyGiftRegistrationValue=='')
      {

        alert('Please select gift registry value')
      }

      if(MySelectedVal=='2')
      {
        

        if(this.state.FromName=='')
        {
  
          alert('Please enter your From Name')
        }

       else if(this.state.MyYesnoRecived=='')
        {
  
          alert('Please select Is Giver a PEP')
        }

        else if(this.state.FromCompany=='')
        {
  
          alert('Please enter From Comapny')
        }

        else if(this.state.FromTitle=='')
        {
  
          alert('Please enter From Title')
        }

        else if(this.state.FromAddress=='')
        {
  
          alert('Please enter From Address')
        }

        else if(this.state.Valueofgift=='')
        {
  
          alert('Please enter Value of Gift')
        }

        else if(this.state.MyCurrencyvalue=='')
        {
  
          alert('Please Select currency')
        }

        else if(this.state.descofgit=='')
        {
  
          alert('Please enter description of Gift')
        }

        else if(this.state.Recevingpart=='')
        {
  
          alert('Please enter receving Party')
        }

        else if(this.state.dtgiftrecieved=='')
        {
  
          alert('Please select date of gift recevied')
        }

        else if(this.state.businesspurposegiftrecived=='')
        {
          alert('Please enter business purpose of gift')
        }

        else if(this.state.FileValuerecived.length==0)
        {
         
          alert('please select any file');
        }

        else
        {

          
    
let date1=(this.state.dtgiftrecieved.getDate()+1);

console.log(date1);

let month1= (this.state.dtgiftrecieved.getMonth()+1);

let year1 =(this.state.dtgiftrecieved.getFullYear());

let FinalRequestDelDate=month1+'/'+this.state.dtgiftrecieved.getDate() +'/' +year1;


          let myfiles=[];

          for(var count=0;count<this.state.FileValuerecived.length;count++)
          {
            
            myfiles.push(this.state.FileValuerecived[count]);
          }

          

          this._service.SaveRecived(

          this.state.yourName,
          this.state.yourTitle,
          this.state.MyBussinessUnitValue,
          this.state.FromName,
          this.state.MyYesnoRecived,
          this.state.FromCompany,
          this.state.FromTitle,
          this.state.FromAddress,
          this.state.Valueofgift,
          this.state.MyCurrencyvalue,
          this.state.descofgit,
          this.state.Recevingpart,
          FinalRequestDelDate,
          this.state.businesspurposegiftrecived,
          this.state.addcommentsrecived,
          this.state.MyGiftRegistrationValue,
          CountryName,
          this.state.ReqCurrval,
          

          
          myfiles).then(function (data:any)
          {
      
            console.log(data);

            console.log(Envval);

            alert('Record submitted successfully');
            window.location.replace(Envval);
      
      
          });
              
         }
    

      }

      else if(MySelectedVal=='1')
      {
    
        if(this.state.Givename=='')
        {
  
          alert('Please enter your Name')
        }

        else if(this.state.MyYesnoGiven=='')

        {
       
        alert('Please select Given to PEP')

        }

        else if(this.state.GivenCompany=='')
        {
            
          alert('Please enter Company Name')

        }

        else if(this.state.GivenTitle=='')
        {
            
          alert('Please enter Title')

        }

        else if(this.state.GivenAddress=='')
        {
            
          alert('Please enter Address')

        }

        else if(this.state.ValueofGiftgiven=='')
        {
            
          alert('Please enter Value of Gift Given')

        }

        else if(this.state.MyCurrencyvalueGiven=='')
        {
            
          alert('Please select currency of Gift')

        }

        else if(this.state.descofgitgiven=='')
        {
            
          alert('Please enter description')

        }

        else if(this.state.Givingparty=='')
        {
            
          alert('Please enter Giving Party')

        }

        else if(this.state.dtgiftgiven=='')
        {
            
          alert('Please select date of gift given')

        }

        else if(this.state.businesspurposegiftgiven=='')
        {
            
          alert('Please enter businness purpose')

        }

        else if(this.state.FileValuegiven.length==0)
        {
         
          alert('please select any file');
        }

        else
        {

          
let date1=(this.state.dtgiftgiven.getDate()+1);

console.log(date1);

let month1= (this.state.dtgiftgiven.getMonth()+1);

let year1 =(this.state.dtgiftgiven.getFullYear());

let FinalRequestDelDate1=month1+'/'+this.state.dtgiftgiven.getDate() +'/' +year1;


          let myfiles=[];

          for(var count=0;count<this.state.FileValuegiven.length;count++)
          {
            
            myfiles.push(this.state.FileValuegiven[count]);
          }

          this._service.SaveGiven(
            
          this.state.yourName,
          this.state.yourTitle,
          this.state.MyBussinessUnitValue,

          this.state.Givename,
          this.state.MyYesnoGiven,
          this.state.GivenCompany,
          this.state.GivenTitle,
          this.state.GivenAddress,


          this.state.ValueofGiftgiven,
          this.state.MyCurrencyvalueGiven,
          this.state.descofgitgiven,
          this.state.Givingparty,
          FinalRequestDelDate1,


          this.state.businesspurposegiftgiven,
          this.state.addcommentsgiven,
          this.state.MyGiftRegistrationValue,
          CountryName,
          CurrencyValue1,
          
          
            myfiles).then(function (data:any)
          {
      
            console.log(data);

            alert('Record submitted successfully');
            
            window.location.replace(Envval);
      
      
          });
              
         
        }
    

      }


    }

    private OnBtnClickApprove():void{

      let itemId = this.getParam('SID');

      RequestType = this.getParam1('Request');

      if(this.state.ReviewerNameId=='')
      {

        alert('Please select the reviewr name');

      }

      else if(this.state.myRiskoptions=='')

      {
        alert('Please select risk review');

      }

      else if(this.state.signoffNameId=='')

      {
        alert('Please select sign-off Name');

      }

      else if(RequestType=='Given')
      {

    
        this._service.updateGiftRegistryGiven(itemId,(this.state.ReviewerNameId == null ? 0:this.state.ReviewerNameId.Id),this.state.myRiskoptions,(this.state.signoffNameId == null ? 0:this.state.signoffNameId.Id),this.state.ReviewerComments).then(function (data:any)
        {
      
          alert('Record updated successfully');
      
          window.location.replace(Envval);
      
        });
      }

      else if(RequestType=='Received')
      {

    
        this._service.updateGiftRegistryReceived(itemId,(this.state.ReviewerNameId == null ? 0:this.state.ReviewerNameId.Id),this.state.myRiskoptions,(this.state.signoffNameId == null ? 0:this.state.signoffNameId.Id),this.state.ReviewerComments).then(function (data:any)
        {
      
          alert('Record updated successfully');
      
          window.location.replace(Envval);
      
        });
      }

    }


  public render(): React.ReactElement<IGiftRegistrationProps> {
  

    return (

      <Stack tokens={stackTokens} styles={stackStyles} >
      <Stack>

      <b><label className={styles.HeadLable}>GIft Registry Identification</label></b><br/>  
      <b><label className={styles.labelsFonts}>Your Name <label className={styles.recolorss}>*</label></label></b><br/>  
      <input type="text" name="txtyourName" value={this.state.yourName} onChange={this.changeYourname.bind(this)} className={styles.links} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
      <b><label className={styles.labelsFonts}>Your Title <label className={styles.recolorss}>*</label></label></b><br/>  
      <input type="text" name="txtyourtitle" value={this.state.yourTitle} onChange={this.changeYourTitle.bind(this)} className={styles.links} disabled={this.state.ApproverExsits == true?true :false }/><br></br>

      <b><label className={styles.labelsFonts}>Property Country <label className={styles.recolorss}>*</label></label></b><br></br> 

<Dropdown className={styles.onlyFont}
  placeholder="Select  Business Unit"
  options={this.state.BussinessUnitItems}
  styles={dropdownStyles}
  selectedKey={this.state.MyBussinessUnitValue ? this.state.MyBussinessUnitValue : undefined} onChange={this.hadleBussinessUnit.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/>
  <br></br>

  <b><label className={styles.HeadLable}>GIft Registry</label></b><br/>  

  <b><label className={styles.labelsFonts}> Was the Gift / Entertainment Received or Given on Behalf of Capco. <label className={styles.recolorss}>*</label></label></b><br/>  

<Dropdown className={styles.onlyFont}
  placeholder="Select  Gift Registry"
  options={this.state.GiftRegistrationItems}
  styles={dropdownStyles}
  selectedKey={this.state.MyGiftRegistrationValue ? this.state.MyGiftRegistrationValue : undefined} onChange={this.hadleGiftRegistry.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/>
  <br></br>

     </Stack>

{/* NormalUser */}

{this.state.divhide == 'receive' &&  this.state.ApproverExsits == false && RecordId=="" &&

<div id="divregion1"> 

<div className={styles.Divsection}>


<b><label className={styles.HeadLable}>Recieved Gift / Entertainment for Capco</label></b>

</div>


<Stack horizontal tokens={stackTokens1}>

<StackItem className={styles.coststyle} >

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Identify who gave the gift</label></b><br/>  

</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Name <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtFromName" value={this.state.FromName} onChange={this.changeFromname.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Is Giver a PEP (Politically Exposed Person) <label className={styles.recolorss}>*</label></label></b><br/><br/>  

<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={drpYesorNo}
  styles={dropdownStyles}
  selectedKey={this.state.MyYesnoRecived ? this.state.MyYesnoRecived : undefined} onChange={this.hadleYesNoRecived.bind(this)}/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Company <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtFromCompany" value={this.state.FromCompany} onChange={this.changeFromcomapny.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Title <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtFromTitle" value={this.state.FromTitle} onChange={this.changeFromTitle.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Address <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtFromAddress" value={this.state.FromAddress} onChange={this.changeAddress.bind(this)} className={styles.boxsize}/><br></br>
</div>


</StackItem>



<StackItem className={styles.coststyle}>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Description of Gift / Entertainment</label></b><br/>  
</div>


<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Value of the Gift / Entertainment Received <label className={styles.recolorss}>*</label></label></b><br/><br/>  
<input type="text" name="txtvalueofgift" value={this.state.Valueofgift} onChange={this.changeValueofgift.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Currency of Gift Received <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select  Currency"
  options={this.state.CurrencyListItems}
  styles={dropdownStyles}
  selectedKey={this.state.MyCurrencyvalue ? this.state.MyCurrencyvalue : undefined} onChange={this.hadleCurrency.bind(this)}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Description of Gift / Entertainment Received <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtdescofgift" value={this.state.descofgit} onChange={this.changedescofgift.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Receiving Party <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtRecevingParty" value={this.state.Recevingpart} onChange={this.changeRecevingParty.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Date Gift Was Received <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.welcome}>
           {/* <DateTimePicker  
          dateConvention={DateConvention.Date}  
          showLabels={false}
          value={this.state.dtgiftrecieved}  
          onChange={this.handlgiftrecivedDateChange}
           />   */}

<DatePicker id="dtgiftrecievedid" placeholder="Select a date..."
                            onSelectDate={this._onSelectDate}
                            value={this.state.dtgiftrecieved}
                            formatDate={this._onFormatDate}
                            isMonthPickerVisible={false}
                            
                            

                        />
           </div>

        </div><br></br>

</StackItem>



<StackItem className={styles.coststyle}>

<div className={styles.Divsection}> 

<b><label className={styles.HeadLable}>Define Gift / Entertainment</label></b><br/><br/>
</div>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}> Business Purpose of Gift / Entertainment Received <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtbusinesspurposegiftreceived" value={this.state.businesspurposegiftrecived} onChange={this.changeBusinesspurposegiftrecived.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}> Additional Comments for Received Gift / Entertainment</label></b><br/><br/>  
 <textarea name="txtaddcommentsrecived" value={this.state.addcommentsrecived} onChange={this.changecommentsrecived.bind(this)} className={styles.boxsize}/><br></br> 
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment for Gift / Entertainment Given(Choose an option)<label className={styles.recolorss}>*</label></label></b><br/><br/>

<input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived.bind(this)} disabled={this.state.disableFileUploadrecived}/>

{this.state.FileValuerecived.map((item:any,index:any) =>(

 <div className={styles.padcss}>  
 
 {item.name} <Icon iconName='Delete'  onClick={(event:any) => {this._removeItemFromDetailrecived(item)}}/>

 </div>
 
  

))}

</div>

</StackItem>

</Stack>
  
</div>

}

{/* NormalUser */}

{this.state.divhide == 'Gave' &&  this.state.ApproverExsits == false  && RecordId=="" &&

<div id="divregion2"> 

<div className={styles.Divsection}>

<b><label className={styles.HeadLable}>Given Gift / Entertainment for Capco</label></b><br/>

</div>

<Stack horizontal tokens={stackTokens1}>
<StackItem className={styles.coststyle} >
<div className={styles.Divsection}>

<b><label className={styles.HeadLable}>Identify who the gift was given to.</label></b><br/>  
</div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Name <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtName" value={this.state.Givename} onChange={this.changeGivenname.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Gift / Entertainment given to PEP ( Politically Exposed Person ) <label className={styles.recolorss}>*</label></label></b> <br/><br/>


<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={drpYesorNo}
  styles={dropdownStyles}
  selectedKey={this.state.MyYesnoGiven ? this.state.MyYesnoGiven : undefined} onChange={this.hadleYesNoGiven.bind(this)}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Company <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtCompany" value={this.state.GivenCompany} onChange={this.changeGivencomapny.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Title <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtTitle" value={this.state.GivenTitle} onChange={this.changeGivenTitle.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Address <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtAddress" value={this.state.GivenAddress} onChange={this.changeGivenAddress.bind(this)} className={styles.boxsize}/><br></br>
</div>

</StackItem>


<StackItem className={styles.coststyle}>
<div className={styles.Divsection}> 
<b><label className={styles.HeadLable}>Description of Gift / Entertainment</label></b><br/><br/>  
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Value of Gift / Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtvalueofgift" value={this.state.ValueofGiftgiven} onChange={this.changeValueofgiftGiven.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}>Currency of Gift/ Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select  Currency"
  options={this.state.CurrencyListItemsGiven}
  styles={dropdownStyles}
  selectedKey={this.state.MyCurrencyvalueGiven ? this.state.MyCurrencyvalueGiven : undefined} onChange={this.hadleCurrencyGiven.bind(this)}/><br></br>
 </div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Description of Gift / Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtdescofgift" value={this.state.descofgitgiven} onChange={this.changedescofgiftgiven.bind(this)} className={styles.boxsize}/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Giving Party<label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtgivingParty" value={this.state.Givingparty} onChange={this.changeGivingParty.bind(this)} className={styles.boxsize}/><br></br>
</div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Date Gift Was Given <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.welcome}>
        
<DatePicker placeholder="Select a date..."
                            onSelectDate={this._onSelectDate1}
                            value={this.state.dtgiftgiven}
                            formatDate={this._onFormatDate1}
                            isMonthPickerVisible={false}
                            

                        />

        </div><br></br>
        </div>


</StackItem>


<StackItem className={styles.coststyle}>

<div className={styles.Divsection}> 

<b><label className={styles.HeadLable}>Define Gift / Entertainment</label></b><br/><br/>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}> Business Purpose of Gift / Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtbusinesspurposegift" value={this.state.businesspurposegiftgiven} onChange={this.changeBusinesspurposegiftGiven.bind(this)} className={styles.boxsize}/><br></br>
</div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}> Additional Comments for Gift / Entertainment Given</label></b><br/><br/>
<textarea id="txtbusinesspurposegiftreceived" value={this.state.addcommentsgiven} onChange={this.changeAddcommentsgiven.bind(this)} className={styles.boxsize}></textarea>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment for Gift / Entertainment Given(Choose an option)<label className={styles.recolorss}>*</label></label></b><br/><br/>
 
<input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived1.bind(this)} disabled={this.state.disableFileUploadGiven}/>

{this.state.FileValuegiven.map((item:any,index:any) =>(

 <div className={styles.padcss}>  
 
 {item.name} <Icon iconName='Delete'  onClick={(event:any) => {this._removeItemFromDetailrecived1(item)}}/>

 </div>
 
  

))}

</div>

</StackItem>

  </Stack>

</div>

}


{this.state.ApproverExsits == true && RequestType=='Received' && RecordId!="" &&

<div id="divregion1"> 

<div className={styles.Divsection}>


<b><label className={styles.HeadLable}>Recieved Gift / Entertainment for Capco</label></b>

</div>

<Stack horizontal tokens={stackTokens1}>

<StackItem className={styles.coststyle} >

<div className={styles.Divsection}>  

<b><label className={styles.HeadLable}>Identify who gave the gift</label></b><br/>  

</div>
<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Name <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtFromName" value={this.state.FromName} onChange={this.changeFromname.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>Is Giver a PEP (Politically Exposed Person) <label className={styles.recolorss}>*</label></label></b><br/><br/>  

<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={drpYesorNo}
  styles={dropdownStyles}
  selectedKey={this.state.MyYesnoRecived ? this.state.MyYesnoRecived : undefined} onChange={this.hadleYesNoRecived.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Company <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtFromCompany" value={this.state.FromCompany} onChange={this.changeFromcomapny.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Title <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtFromTitle" value={this.state.FromTitle} onChange={this.changeFromTitle.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}>  
<b><label className={styles.labelsFonts}>From Address <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtFromAddress" value={this.state.FromAddress} onChange={this.changeAddress.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>


</StackItem>



<StackItem className={styles.coststyle}>

<div className={styles.Divsection}>  
<b><label className={styles.HeadLable}>Description of Gift / Entertainment</label></b><br/>  
</div>


<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Value of the Gift / Entertainment Received <label className={styles.recolorss}>*</label></label></b><br/><br/>  
<input type="text" name="txtvalueofgift" value={this.state.Valueofgift} onChange={this.changeValueofgift.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Currency of Gift Received <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select  Currency"
  options={this.state.CurrencyListItems}
  styles={dropdownStyles}
  selectedKey={this.state.MyCurrencyvalue ? this.state.MyCurrencyvalue : undefined} onChange={this.hadleCurrency.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Description of Gift / Entertainment Received <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtdescofgift" value={this.state.descofgit} onChange={this.changedescofgift.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Receiving Party <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtRecevingParty" value={this.state.Recevingpart} onChange={this.changeRecevingParty.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Date Gift Was Received <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.welcome}>
         
<DatePicker placeholder="Select a date..."
                            onSelectDate={this._onSelectDate}
                            value={this.state.dtgiftrecieved}
                            formatDate={this._onFormatDate}
                            isMonthPickerVisible={false}
                            disabled={this.state.ApproverExsits == true?true :false }

                        />
           </div>

        </div><br></br>

</StackItem>



<StackItem className={styles.coststyle}>

<div className={styles.Divsection}> 

<b><label className={styles.HeadLable}>Define Gift / Entertainment</label></b><br/><br/>
</div>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}> Business Purpose of Gift / Entertainment Received <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtbusinesspurposegiftreceived" value={this.state.businesspurposegiftrecived} onChange={this.changeBusinesspurposegiftrecived.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}> Additional Comments for Received Gift / Entertainment</label></b><br/><br/>  
<textarea name="txtaddcommentsrecived" value={this.state.addcommentsrecived} onChange={this.changecommentsrecived.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment for Gift / Entertainment Given(Choose an option)<label className={styles.recolorss}>*</label></label></b><br/><br/>

<input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/>

{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}

</div>

</StackItem>



</Stack>
</div>

}

{this.state.ApproverExsits == true && RequestType=='Given' && RecordId!="" &&

<div id="divregion2"> 

<div className={styles.Divsection}>

<b><label className={styles.HeadLable}>Given Gift / Entertainment for Capco</label></b><br/>

</div>

<Stack horizontal tokens={stackTokens1}>
<StackItem className={styles.coststyle} >
<div className={styles.Divsection}>

<b><label className={styles.HeadLable}>Identify who the gift was given to.</label></b><br/>  
</div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Name <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtName" value={this.state.Givename} onChange={this.changeGivenname.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Gift / Entertainment given to PEP ( Politically Exposed Person ) <label className={styles.recolorss}>*</label></label></b> <br/><br/>


<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={drpYesorNo}
  styles={dropdownStyles}
  selectedKey={this.state.MyYesnoGiven ? this.state.MyYesnoGiven : undefined} onChange={this.hadleYesNoGiven.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Company <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtCompany" value={this.state.GivenCompany} onChange={this.changeGivencomapny.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Title <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtTitle" value={this.state.GivenTitle} onChange={this.changeGivenTitle.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Address <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtAddress" value={this.state.GivenAddress} onChange={this.changeGivenAddress.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

</StackItem>


<StackItem className={styles.coststyle}>
<div className={styles.Divsection}> 
<b><label className={styles.HeadLable}>Description of Gift / Entertainment</label></b><br/><br/>  
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Value of Gift / Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtvalueofgift" value={this.state.ValueofGiftgiven} onChange={this.changeValueofgiftGiven.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 

<b><label className={styles.labelsFonts}>Currency of Gift/ Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<Dropdown className={styles.onlyFont}
  placeholder="Select  Currency"
  options={this.state.CurrencyListItemsGiven}
  styles={dropdownStyles}
  selectedKey={this.state.MyCurrencyvalueGiven ? this.state.MyCurrencyvalueGiven : undefined} onChange={this.hadleCurrencyGiven.bind(this)} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
 </div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Description of Gift / Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtdescofgift" value={this.state.descofgitgiven} onChange={this.changedescofgiftgiven.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Giving Party<label className={styles.recolorss}>*</label></label></b><br/><br/> 
<input type="text" name="txtgivingParty" value={this.state.Givingparty} onChange={this.changeGivingParty.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Date Gift Was Given <label className={styles.recolorss}>*</label></label></b><br/><br/> 
<div className={styles.welcome}>
        
<DatePicker placeholder="Select a date..."
                            onSelectDate={this._onSelectDate1}
                            value={this.state.dtgiftgiven}
                            formatDate={this._onFormatDate1}
                            isMonthPickerVisible={false}
                            
                            disabled={this.state.ApproverExsits == true?true :false }
                        />

        </div><br></br>
        </div>


</StackItem>


<StackItem className={styles.coststyle}>

<div className={styles.Divsection}> 

<b><label className={styles.HeadLable}>Define Gift / Entertainment</label></b><br/><br/>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}> Business Purpose of Gift / Entertainment Given <label className={styles.recolorss}>*</label></label></b><br/><br/>
<input type="text" name="txtbusinesspurposegift" value={this.state.businesspurposegiftgiven} onChange={this.changeBusinesspurposegiftGiven.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }/><br></br>
</div>
<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}> Additional Comments for Gift / Entertainment Given</label></b><br/><br/>
<textarea id="txtbusinesspurposegiftgiven" value={this.state.addcommentsgiven} onChange={this.changeAddcommentsgiven.bind(this)} className={styles.boxsize} disabled={this.state.ApproverExsits == true?true :false }></textarea>
</div>

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Attachment for Gift / Entertainment Given(Choose an option)<label className={styles.recolorss}>*</label></label></b><br/><br/>
 
<input id="infringementFiles" type="file"  name="files[]"  onChange={this.changeFileuploadRecived1.bind(this)} disabled={this.state.disableFileUploadGiven}/>
{this.state.AttachmentFiles.length>0 && this.state.AttachmentFiles.map((item:any,index:any) =>( 
    <div><a href={item.ServerRelativeUrl} target="_blank">{item.FileName} </a></div>
   ))}

 
  

</div>

</StackItem>

  </Stack>

</div>

}

<PrimaryButton text="Submit" onClick={this.OnBtnClick.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage} disabled={this.state.ApproverExsits == true?true :false }/><br></br>

{this.state.ApproverExsits == true &&

<Stack tokens={stackTokens} styles={stackStyles} >
<Stack>
<b><label className={styles.HeadLable}>Risk Review </label></b><br></br><br></br>
<b><label className={styles.labelsFonts}>Risk Reviewer<label className={styles.recolorss}>*</label></label></b><br></br><br></br>
<div className={styles.Pepsize}>  
              <PeoplePicker 
                  context={this.props.context}
                  //titleText="User Name"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems.bind(this)}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  defaultSelectedUsers={(this.state.ReviewerNameId && this.state.ReviewerNameId.length) ? [this.state.ReviewerNameId] : []}
                  ref={c => (this.ppl = c)} 
                  resolveDelay={1000} />  
</div>
<br></br><br></br>
  
<b><label className={styles.labelsFonts}>Risk Review (Does this meet policy standards)<label className={styles.recolorss}>*</label></label></b><br></br>

<Dropdown className={styles.onlyFont}
  placeholder="Select  Yes or NO"
  options={drpRiskReviewOptions}
  styles={dropdownStyles}
  selectedKey={this.state.myRiskoptions ? this.state.myRiskoptions : undefined} onChange={this.hadleRiskYesNoGiven.bind(this)}/><br></br><br></br>

<b><label className={styles.HeadLable}>Gift/Entertainment</label></b><br></br><br></br>
<b><label className={styles.labelsFonts}>Risk Approver Signature<label className={styles.recolorss}>*</label></label></b><br></br><br></br>

<StackItem>
<Checkbox label="(I have reviewed the submitted Gift/Entertainment)" checked={this.state.Mycheckbox} onChange={this.handleChange2.bind(this)} value={'(I have reviewed the submitted Gift/Entertainment'}/><br></br><br></br>
</StackItem>


<b><label className={styles.labelsFonts}>Sign-Off<label className={styles.recolorss}>*</label></label></b><br></br><br></br>
<div className={styles.Pepsize}>  
              <PeoplePicker 
                  context={this.props.context}
                  //titleText="User Name"
                  personSelectionLimit={1}
                  showtooltip={true}
                  required={true}
                  disabled={false}
                  onChange={this._getPeoplePickerItems1.bind(this)}
                  showHiddenInUI={false}
                  principalTypes={[PrincipalType.User]}
                  defaultSelectedUsers={(this.state.signoffNameId && this.state.signoffNameId.length) ? [this.state.signoffNameId] : []}
                  ref={c => (this.ppl = c)} 
                  resolveDelay={1000} />  
</div>
<br></br>

{this.state.divhidemonth == true &&  

<div className={styles.Divsection}> 
<b><label className={styles.labelsFonts}>Reviewer Comments</label></b><br/><br/>
<textarea id="ReviewerComments" value={this.state.ReviewerComments} onChange={this.changeReviewrcomments.bind(this)} className={styles.boxsize1}></textarea>
</div>

}


</Stack><br></br>
<PrimaryButton text="Approve" onClick={this.OnBtnClickApprove.bind(this)} styles={stackButtonStyles} className={styles.welcomeImage}/><br></br>


</Stack>

  }
</Stack>


);

  
  }


}

import { sp } from "@pnp/sp/presets/all";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import "@pnp/sp/fields";
import "@pnp/sp/attachments";
import "@pnp/sp/files";


export default class Service {

    public mysitecontext: any;

    public constructor(siteUrl: string, Sitecontext: any) {
        this.mysitecontext = Sitecontext;


        sp.setup({
            sp: {
                baseUrl: siteUrl

            },
        });

    }

public async test123():Promise<any>
{

    this.SaveRecived('','','','','','','','','','','','','','','','','','','');
    this.SaveGiven('','','','','','','','','','','','','','','','','','','');
    this.updateGiftRegistryReceived(2,"","","","");
    this.updateGiftRegistryGiven(2,"","","","");
 
}


    public async GetAllBussinessUnits():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("BusinessUnits").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

    public async GetAllgiftregistries():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("GiftRegistry").items.select('Title','ID','RequestType').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

    public async GetAllCurrencies():Promise<any>
    {
 
     return await sp.web.lists.getByTitle("Currency").items.select('Title','ID').expand().get().then(function (data:any) {
 
     return data;
 
 
     });
 
 
    }

    private async SaveRecived (
        YourName:string,
        YourTitle:string,
        MyCountryVal:string,
        FromName:String,
        IsGiveraPEP:string,
        FromCompany:string,
        FromTitle:string,
        FromAddress:string,
        ValueofGift:string,
        CurrencyRecivedId:string,
        DescriptionofGift:string,
        ReceivingParty:string,
        myDate:string,
        BusinessPurposeofGift:string,
        AdditionalCommentsforGiftrecived:string,
        GiftRegistryval:string,
        CountrynameVal:string,
        MyCurrencyValue:string,
        acceptedFiles:any)  {

        let Myval='Completed';
    
        try
        {

         

          let file=acceptedFiles;
    
          let Varmyval= await sp.web.lists.getByTitle("Gift Registry Submissions Received").items.add({
    
            YourName:YourName,
            YourTitle:YourTitle,
            CountryId:MyCountryVal,
            FromName:FromName,
            IsGiveraPEP:IsGiveraPEP,
            FromCompany:FromCompany,
            FromTitle:FromTitle,
            FromAddress:FromAddress,
            ValueofGift:ValueofGift,
            CurrencyofGiftReceivedId:CurrencyRecivedId,
            DescriptionofGift:DescriptionofGift,
            ReceivingParty:ReceivingParty,
            DateGiftWasReceived:myDate,
            BusinessPurposeofGift:BusinessPurposeofGift,
            AdditionalCommentsforGift:AdditionalCommentsforGiftrecived,
            GiftRegistryId:GiftRegistryval,
            CountryName:CountrynameVal,
            Currency:MyCurrencyValue,
            Title: "Request Created",
            
          
    
        }).then (async r => {
          // this will add an attachment to the item we just created to push t sharepoint list
    
        for(var count=0;count<file.length;count++)
        {
         await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
        console.log(result);
    
          })
    
        }
    
        return Myval;
    
    
    
        })
    
        
    
        return Varmyval;
    
        
      }
    
    
    
      catch (error) {
        console.log(error);
      }
    
    
      
     }


     private async SaveGiven (
        YourName:string,
        YourTitle:string,
        MyCountryVal:string,

        Name:String,
        EntertainmentgiventoPEP:string,
        Company:string,
        TitleforGivenGift:string,
        Address:string,

        ValueofGift:string,
        CurrencyRecivedId:string,
        DescriptionofGift:string,
        GivingParty:string,
        myDate:string,
        BusinessPurposeofGift:string,
        AdditionalCommentsforGift:string,
        GiftRegistryval:string,
        CountrynameVal:string,
        MyCurrencyVal:string,
        acceptedFiles:any)  {

        let Myval='Completed';
    
        try
        {

           
          let file=acceptedFiles;
    
          let Varmyval= await sp.web.lists.getByTitle("Gift Registry Submissions Given").items.add({
    
            YourName:YourName,
            YourTitle:YourTitle,
            CountryId:MyCountryVal,

            Name:Name,
            EntertainmentgiventoPEP:EntertainmentgiventoPEP,
            Company:Company,
            TitleforGivenGift:TitleforGivenGift,
            Address:Address,


            ValueofGift:ValueofGift,
            CurrencyofGiftId:CurrencyRecivedId,
            DescriptionofGift:DescriptionofGift,
            GivingParty:GivingParty,
            DateGiftWasGiven:myDate,

            BusinessPurposeofGift:BusinessPurposeofGift,
            AdditionalCommentsforGift:AdditionalCommentsforGift,
            GiftRegistryId:GiftRegistryval,
            CountryName:CountrynameVal,
            Currency:MyCurrencyVal,
            Title: "Request Created",
            
          
    
        }).then (async r => {
          // this will add an attachment to the item we just created to push t sharepoint list
    
        for(var count=0;count<file.length;count++)
        {
         await r.item.attachmentFiles.add(file[count].name, file[count]).then(result => {
        console.log(result);
    
          })
    
        }
    
        return Myval;
    
    
    
        })
    
        
    
        return Varmyval;
    
        
      }
    
    
    
      catch (error) {
        console.log(error);
      }
    
    
      
     }


     public async getEnvironment():Promise<any>
     {
     
     return await sp.web.lists.getByTitle("Environment").items.select('Title','ID').expand().get().then(function (data:any) {
      
     return data;
     
     });
    }     

    public async getUserByLogin(LoginName:string):Promise<any>{
        try{
            const user = await sp.web.siteUsers.getByLoginName(LoginName).get();
            return user;
        }catch(error){
            console.log(error);
        }
    }

    public async getCurrentUserSiteGroups(): Promise<any[]> {

        try {

            return (await sp.web.currentUser.groups.select("Id,Title,Description,OwnerTitle,OnlyAllowMembersViewMembership,AllowMembersEditMembership,Owner/Id,Owner/LoginName").expand('Owner').get());

        }
        catch {
            throw 'get current user site groups failed.';
        }

    }


    public async getItemByIDRecived(ItemID: any): Promise<any> {
        try {

    const selectedList = 'Gift Registry Submissions Received';
    const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Attachments,AttachmentFiles").expand("AttachmentFiles").filter("ID eq '" + ItemID + "'").get();
            return Item[0];
        } catch (error) {
            console.log(error);
        }
    }

    public async getItemByIDGiven(ItemID: any): Promise<any> {
        try {

    const selectedList = 'Gift Registry Submissions Given';
    const Item: any[] = await sp.web.lists.getByTitle(selectedList).items.select("*,Attachments,AttachmentFiles").expand("AttachmentFiles").filter("ID eq '" + ItemID + "'").get();
            return Item[0];
        } catch (error) {
            console.log(error);
        }
    }

    private async updateGiftRegistryReceived(MyRecordId:number,MyReviewrSign:string,MyRiskReviewPolicy:string,MySignOff:string,MyReviewerComments:string)
    {

      let MyListTitle='Gift Registry Submissions Received';

        try
        {
    
        let list = sp.web.lists.getByTitle(MyListTitle);
        let Varmyval = await list.items.getById(MyRecordId).update({

        //Emp Update
        
        Title:"Updated by Approver",
        RiskReviewerId:MyReviewrSign,
        RiskReviewPolicy:MyRiskReviewPolicy,
        SignOffId:MySignOff,
        Status:'Approved' ,
        ReviewerComments:MyReviewerComments      
        
    }).then (async r => {

        });

        return Varmyval;

        }

    
      catch (error) {
        console.log(error);
      }
      

    }

    private async updateGiftRegistryGiven(MyRecordId:number,MyReviewrSign:string,MyRiskReviewPolicy:string,MySignOff:string,MyReviewerComments:string)
    {

      let MyListTitle='Gift Registry Submissions Given';

        try
        {
    
        let list = sp.web.lists.getByTitle(MyListTitle);
        let Varmyval = await list.items.getById(MyRecordId).update({

        //Emp Update
      
        Title:"Updated by Approver",
        RiskReviewerId:MyReviewrSign,
        RiskReviewPolicy:MyRiskReviewPolicy,
        SignOffId:MySignOff,
        Status:'Approved',
      ReviewerComments:MyReviewerComments      
        
    }).then (async r => {

        });

        return Varmyval;

        }

    
      catch (error) {
        console.log(error);
      }
      

    }
    
    
}
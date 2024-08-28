import { Injectable, ElementRef } from '@angular/core';
import { timeout } from "rxjs/operators";

import { HttpClientModule, HttpInterceptor, HttpHeaders, HttpClient } from "@angular/common/http";
import * as e from 'express';
import { Observable } from 'rxjs/internal/Observable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_EXTENSION = '.xlsx';




@Injectable({
  providedIn: 'root'
})
export class ApisService {
  main_url = "https://apidev.showout.studio"; 
  login_enpoint = this.main_url + "/admin/login";
  // get_users = this.main_url + "/admin/get-users";
  get_users = this.main_url + "/user/list";
  
  create_user = this.main_url + "/admin/create";
  get_admin = this.main_url + "/admin/list";
  get_card_list = this.main_url + "/card/list";
  get_card_list_locked = this.main_url + "/card/list/?status=pending approval";
  get_trending_list = this.main_url + "/card/trending";
  get_popular_list = this.main_url + "/card/popular";
  get_recent_list = this.main_url + "/card/recently-played";
  get_playlist = this.main_url + "/playlist/";
  all_playlist = this.main_url + "/playlist/list";
  get_playlist_live = this.main_url + "/playlist/live";
  create_playlist = this.main_url + "/playlist/create";
  market = this.main_url + "/card-listings/market";
  get_market_details_url = this.main_url + "/card-listings/child-listings/";
  verification_endpoint = this.main_url + "/admin/verify";
  get_card_details = this.main_url + "/card/";
  get_distribute_details = this.main_url + "/revenue/distribution/";
  hotpick_url = this.main_url + "/card/hot-pick";
  ads_url = this.main_url + "/ads/create";
  get_adverts_url = this.main_url + "/ads";
  delete_ad_url = this.main_url + "/ads/";
  update_card_url = this.main_url + "/card/";
  delete_tracks_url = this.main_url + "/playlist/tracks";

  approve_card_url = this.main_url + "/card/approve/";
  lock_card_url = this.main_url + "/card/reject/";
  
  topup_url = this.main_url + "/user/transaction/";
  userDetails_url = this.main_url + "/user/transactions/";
  record_revenue_url = this.main_url + "/revenue/";
  record_transaction_url = this.main_url + "/admin/transaction";
  add_to_live_url = this.main_url + "/playlist/tracks/add-to-live";
  
  revenue_list_url = this.main_url + "/revenue/";
  revenue_batch_url = this.main_url + "/revenue/";
  kb_list_url = this.main_url + "/kb/list/";

  header_list_url = this.main_url + "/headers/list/";
 

  verify_user_url = this.main_url + "/user/activate/";
  disable_user_url = this.main_url + "/user/suspend/";
  delete_kb_url = this.main_url + "/kb/";
  delete_user_account = this.main_url + "/user/";
  retrieve_user_account = this.main_url + "/user/";
  delete_headers_url = this.main_url + "/headers/";

  distribute_url = this.main_url + "/revenue/distribute/";

  metrics_url = this.main_url + "/admin/metrics";
  admin_transactions_url = this.main_url + "/admin/transactions";
  kb_url = this.main_url + "/kb/";
  headers_url = this.main_url + "/headers/";
  withdrawals_url = this.main_url + "/withdrawals";
  notifications_url = this.main_url + "/notifications/list";

  notification_url = this.main_url + "/user/send-notification/";

  timeout_value = 20000;

  constructor(public http: HttpClient) { }

  isAuthenticated() {

    // return true;

    var values = localStorage.getItem("token");
    console.log("TOKEN IN DATA PROVIDER CONSTRUCT " + values);
    if (values == null || values == 'null') {
      return false;
    }
    else {
      return true;
    }
 
  }


  public exportTableElmToExcel(element: ElementRef, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element.nativeElement);
    // generate workbook and add the worksheet
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Sheet1');
    // save to file
    XLSX.writeFile(workbook, `${fileName}${EXCEL_EXTENSION}`);

  }


  

  // login(data) {
  //   console.log("WHats data??",)
  //   return new Promise((resolve) => {
  //     this.http
  //       .post(this.login_enpoint, data)
  //       .pipe(
  //         timeout(this.timeout_value))
  //       .subscribe(
  //         (res) => {
  //           resolve(res);
  //         }
          
  //       );
  //   });


  // }
  data

  login(data) {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.login_enpoint;
      this.http.post(this.login_enpoint, data).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);
       
        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

  
  verify(data) {
    const promise = new Promise<void>((resolve, reject) => {
      const apiURL = this.verification_endpoint;
      this.http.post(this.verification_endpoint, data).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }

  all_users(token,page) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("page TOKEN IN PROVIDER " + page);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
         'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/user/list?page=${page}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });

     
    });
    return promise;
  }


  all_users_filter(token, from, to) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("page TOKEN IN PROVIDER " + from);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/user/list?from=${from}&to=${to}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  search(token, search_item) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("page TOKEN IN PROVIDER " + search_item);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/search?${search_item}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  create_admin_user(data,token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };
   
      this.http.post(this.create_user, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }



  all_admins(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_admin, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  cardList(token, page) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      // this.http.get(this.get_card_list, httpOptions)
        
      this.http.get(this.main_url + `/card/list?page=${page}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  cardList_filter(token, from, to) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("page TOKEN IN PROVIDER " + from);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/card/list?from=${from}&to=${to}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



 



  cardListlocked(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_card_list_locked, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  

  trendingcardList(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_trending_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  popular_card(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_popular_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  recent_card(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_recent_list, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  


  display_playlist(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_playlist, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  display_playlist_live(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_playlist_live, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }




  createPlaylist(data, token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.create_playlist, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }



  marketList(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.market, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  retrieveHotpick(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.hotpick_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  



  ///Card Detauls
  cardDetails(token,id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_card_details+id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  userDetails(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.userDetails_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  marketDetails(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_market_details_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  distributionDetails(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_distribute_details + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }







  uploadImage(image: File, url,token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      const formData = new FormData();

      formData.append('photo', image);
      formData.append('link', "https://google.com");

      this.http.post(this.ads_url, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }




  all_ads(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.get_adverts_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  metrics(token,page) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/admin/metrics?page=${page}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  metrics_filter(token,from,to) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/admin/metrics?from=${from}&to=${to}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  


  withdrawals(token,page) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/withdrawals?page=${page}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  withdrawals_filter(token, from, to) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.main_url + `/withdrawals?from=${from}&to=${to}`, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  notification(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.notifications_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  admin_transactions(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.admin_transactions_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  



  revenue_list(token,id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.revenue_list_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }




  revenue_batch_list(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.revenue_batch_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  


  kb_list(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.kb_list_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  header_list(token) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.get(this.header_list_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  


  
  


  


//Delete Ads
  deleteAds(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.delete(this.delete_ad_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  publishId(token, id, apple_id, youtube_id, spotify_id, deezer_id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    console.log("Youtube", youtube_id)
    console.log("Apple Music", apple_id)
    console.log("Spotify", spotify_id)
    console.log("Deezer", deezer_id)

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      const formData = new FormData();
      if (apple_id != undefined) {
        formData.append('apple_id', apple_id);
      }
      else {
        // formData.append('apple_id', "");
      }

      if (youtube_id != undefined) {
        formData.append('youtube_id', youtube_id);
      }
      else {
        // formData.append('youtube_id', "");
      }

      if (spotify_id != undefined) {
        formData.append('spotify_id', spotify_id);
      }
      else {
        // formData.append('spotify_id', "");
      }

      if (deezer_id != undefined) {
        formData.append('deezer_id', deezer_id);
      }
      else {
        // formData.append('deezer_id', "");
      }
      


      this.http.put(this.update_card_url + id, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  




  //Update Ads
  updateAds(token, id,status) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      const formData = new FormData();

      formData.append('is_active', status);
     

      this.http.put(this.delete_ad_url + id, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  //Delete Ads
  deleteTracks(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu",
          data: data
        }),
      };

      this.http.delete(this.delete_tracks_url, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }
  


  
  updateCard(token, id,distribute) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("ID TO PASS " + id);

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.put(this.approve_card_url + id, distribute, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


 lockCard(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("ID TO PASS " + id);

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.put(this.lock_card_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  verifyUser(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };


      this.http.put(this.verify_user_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  
  disableUser(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      // const httpOptions = {
      //   headers: new HttpHeaders({
      //     Accept: "application/json",
      //     Authorization: "Bearer " + token,
      //     'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
      //   }),
      // };

      const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('Authorization', 'Bearer' + token)
        .set('x-api-key', 'fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu');

      
      console.log("CONSTANTSSS::::: " + JSON.stringify(headers));

      this.http.put(this.disable_user_url + id, null, { 'headers': headers }).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  deleteBlog(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.delete(this.delete_kb_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  delete_user(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.delete(this.delete_user_account + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  deleteHeaders(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.delete(this.delete_headers_url + id, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  





  topupWallet(token, id,data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
    console.log("ID TO PASS " + id);

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.topup_url + id, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  sendPush(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
   

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.notification_url, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  record_revenue(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);
 

    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.record_revenue_url, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  record_transaction(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);


    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.record_transaction_url, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }

  add_to_live(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);


    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.add_to_live_url, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  

  



  hotPicked(token, data) {
    console.log("BEARER TOKEN IN PROVIDER " + token);


    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      this.http.post(this.hotpick_url, data, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }



  distribute(token, id) {
    console.log("BEARER TOKEN IN PROVIDER " + token);

    // return new Promise((resolve, reject) => {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };


      this.http.post(this.distribute_url + id, null, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });


    });
    return promise;
  }


  kbUpload(image: File, title, content, category_id, read_time, token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      const formData = new FormData();

      formData.append('photo', image);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('category_id', category_id);
      formData.append('read_time_mins', read_time);

      this.http.post(this.kb_url, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }



  headersUpload(image: File, title, content, cta_text, cta_link, token) {
    const promise = new Promise<void>((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({
          Accept: "application/json",
          Authorization: "Bearer " + token,
          'x-api-key': "fgy6435678hghytr534qwe567890poijhgyftr543wesdrtfyu"
        }),
      };

      // title: ['', Validators.required],
      //   content: ['', Validators.required],
      //     cta_text: [''],
      //       cta_link: [''],
      //         image: [''],

      const formData = new FormData();

      formData.append('photo', image);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('cta_text', cta_text);
      formData.append('cta_link', cta_link);

      this.http.post(this.headers_url, formData, httpOptions).subscribe({
        next: (res: any) => {
          console.log(" resolve(res);", resolve(res))
          return resolve(res);

        },
        error: (err: any) => {
          reject(err);
          console.log(" Error(res);", reject(err))
        },
        complete: () => {
          console.log('complete');
        },
      });
    });
    return promise;
  }
}







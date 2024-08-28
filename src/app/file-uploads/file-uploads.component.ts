import { Component, OnInit } from '@angular/core';
import { ApisService } from "../services/apis.service";
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File, ) { }
}

@Component({
  selector: 'app-file-uploads',
  templateUrl: './file-uploads.component.html',
  styleUrls: ['./file-uploads.component.css']
})
export class FileUploadsComponent implements OnInit {
  file: File = null; // Variable to store file
 
  fileName = '';
  requiredFileType = "image/png";
  selectedFile: ImageSnippet;
  

  constructor(public api: ApisService, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
    console.log("File Chosen::::", this.file)
  }

  // OnClick of button Upload
  onUpload() {
    // this.loading = !this.loading;
    console.log("Uploaded File Chosen::::", this.file)
    // this.fileUploadService.upload(this.file).subscribe(
    //   (event: any) => {
    //     if (typeof (event) === 'object') {

    //       // Short link via api response
    //       this.shortLink = event.link;

    //       this.loading = false; // Flag variable 
    //     }
    //   }
    // );
  }



  // onFileSelected(event) {

  //   const file: File = event.target.files[0];

  //   console.log("Uploaded File Chosen::::", file)

  //   if (file) {

  //     this.fileName = file.name;

  //     console.log("Uploaded fileName::::", this.fileName)

  //     const formData = new FormData();

  //     formData.append("thumbnail", file);

  //     // const upload$ = this.http.post("/api/thumbnail-upload", formData);


  //     // upload$.subscribe();

  //   }

  // }

  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
    // this.modalService.close();
    this.modalService.dismissAll();
    this.router.navigate(['adverts']);
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    var token = localStorage.getItem("token");
    console.log("TOKEN HERE", token)
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;

      console.log("Uploaded fileName::::", this.selectedFile)
      console.log("Uploaded File:::", this.selectedFile.file)
      // console.log("Uploaded src::::", this.selectedFile.src)
      // this.imageService.uploadImage(this.selectedFile.file).subscribe(
      //   (res) => {
      //     this.onSuccess();  
      //   },
      //   (err) => {
      //     this.onError();
      //   })

      this.api.uploadImage(this.selectedFile.file, this.selectedFile.src,token).then(
        (result) => {

          var results_body = result;

          console.log("results", result);
         
          this.onSuccess();
          


        },
          (err) => {
          this.onError();
        }
     )
    });

    reader.readAsDataURL(file);
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  messageForm: FormGroup
  turnClassOn: string
  turnClassOff: string

  constructor(
    private formBuilder: FormBuilder,
    private infoService: InfoService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.createRegisterForm()
  }

  createRegisterForm() {
    this.messageForm = this.formBuilder.group({
      message: ["", Validators.required]
    })
  }

  publish() {
    if (this.messageForm.valid) {

      let messageModel = Object.assign({}, this.messageForm.value)

      this.infoService.publishMessage(messageModel).subscribe((response) => {
        this.toastrService.info("Your message: " + response.message, "Message Sent")
      })
    } else {
      this.toastrService.error("Formunuz eksik", "Hata")
    }
  }

  turnOn() {
    let turnOnCommand = { "confirmed": false, "fPort": 10, "data": "aAJQIYEABGgBBvAAIAEhZGUW" }
    let turnOnObject = Object.assign({}, turnOnCommand)
    this.infoService.publishTurnOnLight(turnOnObject).subscribe(response => {
      this.toastrService.info("Light turned on", "System")
      // Set Class 
      this.turnClassOff = ""
      this.turnClassOn = "text-success"
    })
  }

  turnOff() {

    let turnOffCommand = { "confirmed": false, "fPort": 10, "data": "aAJQIYEABGgBBvAAIAEiAAIW" }
    let turnOffObject = Object.assign({}, turnOffCommand)
    this.infoService.publishTurnOffLight(turnOffObject).subscribe(response => {
      this.toastrService.info("Light turned off", "System")
      // Set Class 
      this.turnClassOff = "text-danger"
      this.turnClassOn = ""
    })
  }

}

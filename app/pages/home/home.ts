import {Page, Modal, NavController, Platform} from 'ionic-angular';  
import {BirthdayService} from '../../services/birthday.service';  
import {DetailsPage} from '../details/details';  
import {NgZone} from 'angular2/core';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {  
    public birthdays = [];

    constructor(private birthdayService: BirthdayService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone) {

    }

    onPageLoaded() {
        this.platform.ready().then(() => {
            this.birthdayService.initDB();

            this.birthdayService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.birthdays = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    showDetail(birthday) {
        let modal = Modal.create(DetailsPage, { birthday: birthday });
        this.nav.present(modal);

        modal.onDismiss(() => {

        });
    }
}
import {Modal, Page, NavParams, ViewController} from 'ionic-angular';  
import {BirthdayService} from '../../services/birthday.service';

@Page({
    templateUrl: 'build/pages/details/details.html'
})
export class DetailsPage {  
    public birthday;
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private birthdayService: BirthdayService) {
    }

    onPageLoaded() {
        this.birthday = this.navParams.get('birthday');

        if (!this.birthday) {
            this.birthday = {};
        }
        else {
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.birthday.Date.toISOString().slice(0, 10);
        }
    }

    save() {
        this.birthday.Date = new Date(this.isoDate);

        if (this.isNew) {
            this.birthdayService.add(this.birthday)
                .catch(console.error.bind(console));
        } else {
            this.birthdayService.update(this.birthday)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }

    delete() {
        this.birthdayService.delete(this.birthday)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.birthday);
    }
}
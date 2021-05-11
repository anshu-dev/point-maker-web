import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';

export default class RegisterController extends Controller {
  @tracked errorMessage;
  @tracked successMessage;
  @service store;

  @action
  async handleSubmit(e) {
    e.preventDefault();
    let { email, username, password, password1 } = this;
    console.log(email, username, password, password1)
    const data = {"email": email, "username": username, "password": password, "password_confirmation": password1}
    let userData = this.store.createRecord('user', data);
    try {
      await userData.save();
      this.successMessage = 'Thank you for registration, Please login to continue!'
    } catch(error) {
      this.errorMessage = error?.errors[0] || error;
    }

  }

  @action
  updateEmail(e) {
    this.email = e.target.value;
  }

  @action
  updateUsername(e) {
    this.username = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }

  @action
  updatePassword1(e) {
    this.password1 = e.target.value;
  }
}
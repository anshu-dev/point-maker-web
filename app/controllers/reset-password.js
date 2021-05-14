import Controller from '@ember/controller';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import { inject as service } from '@ember/service';

export default class ResetPasswordController extends Controller {
  @tracked errorMessage;
  @tracked successMessage;
  @service store;
  
  queryParams = ['t'];
  @tracked t;

  @action
  async handleSubmit(e) {
    e.preventDefault();
    let { password, password1 } = this;
    const data = {user: {"password": password, "password_confirmation": password1, "reset_password_token": this.t}}
    const adapter = this.store.adapterFor('user');
    const baseUrl = adapter.urlForFindAll('user');
    const url = `${baseUrl}/password`;

    try {
      await window.$.ajax({url, type: 'PATCH', data})
      this.successMessage = 'Password reset successfully!';
    } catch(error) {
      console.log(error.responseJSON.errors)
      const errKey = Object.keys(error.responseJSON.errors)[0];
      const key = errKey.split('_').join(' ')
      var value = error.responseJSON.errors[errKey];
      this.errorMessage = `${key} ${value}`;
    }
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
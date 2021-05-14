import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";
import $ from "jquery";

export default class ForgotPasswordController extends Controller {
  @tracked errorMessage;
  @tracked successMessage;
  @service store;
  
  @action
  async handleSubmit(e) {
    e.preventDefault();

    const data = {user:{email: this.get('email')}};
    const adapter = this.store.adapterFor('user');
    const baseUrl = adapter.urlForFindAll('user');
    const url = `${baseUrl}/password`;

    try {
      const result = await window.$.ajax({url, type: 'POST', data})
      console.log('result==',result)
      this.successMessage = 'We have sent you a mail with link to reset your password!';
    } catch(error) {
      console.log(error)
      this.errorMessage = 'Email is invalid!';
    }
  }

  @action
    updateEmail(e) {
      this.email = e.target.value;
      this.errorMessage = null;
      this.successMessage = null;
    }
}
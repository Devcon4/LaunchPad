import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators, ValidationErrors } from '@angular/forms';
import { ProfileService } from '../../../firebaseDataAccessLayer/profile.service';
import { Profile } from '../../../models/profile';
import createFormGroup from '../../../helpers/createFormGroup';
import { AuthService } from '../../../firebaseDataAccessLayer/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm = createFormGroup(this.profileService.doc.state, {
    displayName: [ Validators.required, Validators.pattern(/^(?! )\w+[ ]\w+(?<! )$/) ]
  });

  constructor(private profileService: ProfileService) { }

  ngOnInit() { }

  save() {
    this.profileService.updateDoc(this.profileService.doc.state.id, this.profileForm.value);
  }

  getControlErrors(name: keyof Profile): ValidationErrors {
    return this.profileForm.get(name).errors;
  }
}

import { Component } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";
import { MatDialogContent } from "@angular/material/dialog";
import { MatRadioGroup } from "@angular/material/radio";
import { MatRadioButton } from "@angular/material/radio";
import { MatDialogActions } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-report-comment',
  standalone: true,
  imports: [MatDialogContent, MatRadioGroup, MatRadioButton, MatDialogActions, MatButtonModule, FormsModule, MatFormFieldModule, MatInput],
  templateUrl: './report-comment.component.html',
  styleUrl: './report-comment.component.css'
})

export class ReportCommentComponent {
  selectedReason: string = '';
  personalizedReason: string = ''; // Para almacenar la razón personalizada

  constructor(private dialogRef: MatDialogRef<ReportCommentComponent>) {
  }

  submitReport() {
    let reason = this.selectedReason;

    // Si la opción es 'Others', usar la razón personalizada
    if (this.selectedReason === 'Others') {
      reason = this.personalizedReason;
    }

    if (reason) {
      // Simulación de envío del reporte
      this.dialogRef.close(reason);
    } else {
      alert("Please select or specify a reason.");
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

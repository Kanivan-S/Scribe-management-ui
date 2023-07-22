import { Component, OnInit } from '@angular/core';
import { Gpt3Service } from '../chat-gpt.service';

@Component({
  selector: 'app-assistant',
  templateUrl: './assistant.component.html',
  styleUrls: ['./assistant.component.scss'],
})
export class AssistantComponent implements OnInit {
  gpt3Response: string;

  constructor(private gpt3Service: Gpt3Service) {}

  async getGpt3Response() {
    const prompt =
      "You are a helpful assistant. Please provide information on how to effectively communicate with someone who is visually impaired and uses a screen reader or scribe. I'm looking for tips and best practices to ensure smooth and respectful communication with them. Thanks!";
    this.gpt3Response = await this.gpt3Service.getGpt3Response(prompt);
  }
  ngOnInit(): void {}
}

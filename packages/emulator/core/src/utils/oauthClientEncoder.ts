//
// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license.
//
// Microsoft Bot Framework: http://botframework.com
//
// Bot Framework Emulator Github:
// https://github.com/Microsoft/BotFramwork-Emulator
//
// Copyright (c) Microsoft Corporation
// All rights reserved.
//
// MIT License:
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED ""AS IS"", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
//

import ActivityVisitor from './activityVisitor';
import ICardAction from '../types/card/cardAction';
import IPaymentRequest from '../types/payment/request';
import IActivity from '../types/activity/activity';

export default class OAuthClientEncoder extends ActivityVisitor {
  public static OAuthEmulatorUrlProtocol: string = "oauth:";

  private _conversationId: string;

  constructor(activity: IActivity) {
      super();
      this._conversationId = activity && activity.conversation ? activity.conversation.id : undefined;;
  }

  protected visitCardAction(cardAction: ICardAction) {
  }

  protected visitOAuthCardAction(connectionName: string, cardAction: ICardAction) {
      if (this._conversationId && cardAction && cardAction.type === 'signin' && !cardAction.value) {
          let url = OAuthClientEncoder.OAuthEmulatorUrlProtocol + '//' + connectionName + '&&&' + this._conversationId;

          // change the card action to a special URL for the emulator
          cardAction.type = 'openUrl';
          cardAction.value = url;
      }
  }
}
import Component from '@glimmer/component';

interface WelcomeArgs {
  name: string;
}

export default class Welcome extends Component<WelcomeArgs> {
  hello: string = 'hello';

  get greeting(): string {
    return `${this.hello} ${this.args.name}`;
  }
}

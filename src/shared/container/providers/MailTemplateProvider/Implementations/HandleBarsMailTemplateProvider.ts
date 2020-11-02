import handlebars from 'handlebars';
import IParseMailTemplateDto from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandleBarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    template,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    // const parseTemplate = handlebars.compile(template);
    return handlebars.compile(template)(variables);
  }
}

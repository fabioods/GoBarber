import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDto from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandleBarsMailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDto): Promise<string> {
    // const parseTemplate = handlebars.compile(template);
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    return handlebars.compile(templateFileContent)(variables);
  }
}

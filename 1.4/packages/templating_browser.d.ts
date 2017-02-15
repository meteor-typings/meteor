/// <reference path="blaze.d.ts" />

declare var Template: TemplateStatic;
interface TemplateStatic extends Blaze.TemplateStatic {
  new (viewName?: string, renderFunction?: Function): Blaze.Template;
  body: Blaze.Template;
  [index: string]: any | Blaze.Template;
}

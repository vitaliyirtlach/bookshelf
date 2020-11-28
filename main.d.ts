declare module "*.module.css" {
    const classes: { [key: string]: string };
    export default classes;
  }

declare module "*.module.less" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.graphql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}

declare module '*.gql' {
  import { DocumentNode } from 'graphql'
  const Schema: DocumentNode

  export = Schema
}
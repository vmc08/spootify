export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  height?: any;
  url: string;
  width?: any;
}

export interface IAccount {
  display_name: string;
  email: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  product: string;
  type: string;
  uri: string;
}

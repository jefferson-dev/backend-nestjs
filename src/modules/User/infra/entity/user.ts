export class UserData {
  _id?: string;
  name?: string;
  document_type?: string;
  document_number?: string;
  birth_date?: Date;
  street?: string;
  street_number?: number;
  complement?: string;
  zipcode?: string;
  district?: string;
  city?: string;
  state?: string;
  phone?: string;
  avatar?: string;
  cover?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends UserData {
  constructor(input: UserData) {
    super();
    this._id = input._id && input._id.toString();
    this.name = input.name;
    this.document_type = input.document_type;
    this.document_number = input.document_number;
    this.birth_date = input.birth_date;
    this.street = input.street;
    this.street_number = input.street_number;
    this.complement = input.complement;
    this.zipcode = input.zipcode;
    this.district = input.district;
    this.city = input.city;
    this.state = input.state;
    this.phone = input.phone;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }

  // getAvatarUrl(): string | null {
  //   if (!this.avatar) {
  //     return null;
  //   }

  //   switch (process.env.STORAGE_DRIVE) {
  //     case 'disk':
  //       return `${process.env.APP_API_URL}/file/user/avatar/${this.avatar}`;
  //     case 's3':
  //       return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/user/avatar/${this.avatar}`;
  //     default:
  //       return null;
  //   }
  // }

  // getCoverUrl(): string | null {
  //   if (!this.cover) {
  //     return null;
  //   }

  //   switch (process.env.STORAGE_DRIVE) {
  //     case 'disk':
  //       return `${process.env.APP_API_URL}/file/user/cover/${this.cover}`;
  //     case 's3':
  //       return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/user/cover/${this.cover}`;
  //     default:
  //       return null;
  //   }
  // }
}

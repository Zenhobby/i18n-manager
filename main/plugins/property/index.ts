import * as property from 'java-props';

export const fileExtensions = ['.properties', '.property'];

export const parse = (content: string): Promise<any | undefined> => {
  try {
    return property.parse(content) as any;
  } catch (e) {
    return Promise.resolve(undefined);
  }
};

export const serialize = async (data: object): Promise<string | undefined> => {
  try {
    return property.stringify(data as any);
  } catch (e) {
    return undefined;
  }
};

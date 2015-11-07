/**
 * Created by kee on 15/10/30.
 */
import { getTypeComponent } from '../../utils';
import image from './image';
import text from './text';
import music from './music';

const components = {
  image,
  text,
  music
};

export default getTypeComponent(components);

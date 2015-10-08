/**
 * Created by kee on 15/9/26.
 */
import monk from 'monk'

const db = monk('localhost/ddxblog');

export default db
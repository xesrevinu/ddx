/**
 * Created by kee on 15/9/25.
 */
export default function(Router) {
  const router = new Router();

  /**
   * 首页路由
   * @param  {Function} Router
   * @return {Function}
   */
  router.get('/', function* () {
    yield this.render('index');
  });

  router.get('*', function* () {
    yield this.render('index');
  });

  return router.routes();
}

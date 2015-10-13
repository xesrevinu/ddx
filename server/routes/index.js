/**
 * Created by kee on 15/9/25.
 */
export default function(Router) {
  const router = new Router();

  router.get('/', function* () {
		// let body = React.renderToString(<Hello />);
    yield this.render('index');
  });

  router.get('*', function* () {
    yield this.render('index');
  });

  return router.routes();
}

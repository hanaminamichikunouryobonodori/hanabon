import Link from 'next/link';

const NotFound = () => (
  <div>
    <main>
      <h1>404</h1>
      <div>
        <p>お探しのページは見つかりませんでした。</p>
        <br />
        <p>一時的にアクセスできない状況にあるか、移動もしくは削除された可能性があります。</p>
        <br />
        <p>
          <Link href='/'>トップページへ戻る</Link>
        </p>
      </div>
    </main>
  </div>
);

export default NotFound;

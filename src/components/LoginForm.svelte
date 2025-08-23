<script lang="ts">

</script>

<div>
  <h3>準備中かもしれません．</h3>
  <section>
    <form>
      <label for="email">メール</label><br />
      <input placeholder="user@wing.osaka" type="email" required /><br /><br />
      <label for="password">パスワード</label><br />
      <input placeholder="Passw0rd" type="password" required minlength="6" /><br /><br />
      <button type="submit">ログイン</button><br /><br />
    </form>
  </section>
  <div>
    <a href='/login/new'>新規登録</a>
  </div>
</div>

<style lang='scss'>
  section {
    display: flex;
    justify-content: center;
  }

  form {
    display: block;
    width: 100%;
    max-width: 400px;

    input {
      font-family: FiraCode;
      width: 100%;
    }
  }

  div {
    width: 100%;
    a {
      text-align: center;
      width: 140px;
    }
  }
</style>
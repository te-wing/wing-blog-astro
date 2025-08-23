<script lang="ts">

</script>

<section>
  <form>
    <label for="email">メール</label><br />
    <input placeholder="user@wing.osaka" type="email" required /><br /><br />
    <label for="password">パスワード</label><br />
    <input placeholder="Passw0rd" type="password" required minlength="6" /><br /><br />
    <button type="submit">ログイン</button><br /><br />
    <a href='/login/new'>新規登録</a>
  </form>
</section>

<style lang='scss'>
  section {
    display: flex;
    justify-content: center;
  }

  form {
    display: block;
    width: 100%;
    max-width: 400px;
  }

  input {
    width: 100%;
  }

  button, a {
    
  }
</style>
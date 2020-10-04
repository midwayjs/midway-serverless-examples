;(function(){
  const EmailStorageKey = 'pcommit-email';
  const NickStorageKey = 'pcommit-nick';
  class Pcommit {
    constructor(options) {
      this.container = options.container;
      this.hashName = options.hashName || 'pcommit';
      this.site = options.site;
      this.page = options.page;
      this.host = '.';
      this.main();
    }
  
    main() {
      this.initUI();
      this.bindEvent();
      this.getList();
    }
  
    // 初始化UI
    initUI() {
      this.inputIdPrefix = 'pcommit-input-' + Date.now();
      this.listIdPrefix = 'pcommit-list-' + Date.now();
      this.container.innerHTML = `
        <style>
        .${this.inputIdPrefix}-main {
          margin: 0 auto;
          max-width: 660px;
          padding: 12px;
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          -webkit-tap-highlight-color: transparent; 
        }
        .${this.inputIdPrefix}-title {
          display: block;
          padding: 12px 0;
          font-size: 15px;
          color: #999;
        }
        .${this.inputIdPrefix}-input {
          position: relative;
          margin-bottom: 12px;
        }
        .${this.inputIdPrefix}-input input {
          border-radius: 3px;
          box-sizing: border-box;
          outline: none;
          border: 1px solid #ccc;
          width: 100%;
          line-height: 32px;
          padding: 0 12px;
          padding-left: 56px;
          font-size: 13px;
          color: #000000;
          transition: background-color .3s ease;
          -webkit-appearance: none;
        }
        .${this.inputIdPrefix}-pre {
          position: absolute;
          top: 50%;
          left: 6px;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          background-color: #f1f1f1;
          color: #929292;
          text-align: center;
          border-radius: 3px;
          border: 0;
          width: 44px;
          transform: scale(0.8) translate(0, -12px);
        }
        .${this.inputIdPrefix}-reply {
          position: relative;
          display: none;
          border: 1px solid #ccc;
          margin-bottom: 12px;
          padding: 6px 12px;
          line-height: 20px;
          font-size: 12px;
          background: #f6f7f4;
          border-radius: 3px;
        }
        .${this.inputIdPrefix}-reply-cancel {
          position: absolute;
          right: 12px;
          top: 6px;
          font-size: 12px;
          color: #9090ff;
          cursor: pointer;
        }
        #${this.inputIdPrefix}-text {
          border-radius: 3px;
          box-sizing: border-box;
          outline: none;
          border: 1px solid #ccc;
          width: 100%;
          line-height: 24px;
          height: 72px;
          padding: 6px 12px;
          font-size: 13px;
          resize: none;
          color: #000000;
          margin-bottom: 12px;
          transition: background-color .3s ease;
          -webkit-appearance: none;
        }
        #${this.inputIdPrefix}-submit {
          border-radius: 3px;
          box-sizing: border-box;
          border: 0;
          width: 100%;
          max-width: 120px;
          line-height: 32px;
          text-align: center;
          background-color: #88f;
          color: #ffffff;
          font-size: 13px;
          user-select: none;
          resize: none;
          cursor: pointer;
          margin-bottom: 12px;
        }
        #${this.listIdPrefix} {
          margin-top: 24px;
        }
        .${this.listIdPrefix}-item {
          position: relative;
          padding-left: 44px;
          border-bottom: 1px solid #f5f5f5;
          margin-bottom: 12px;
        }
        .${this.listIdPrefix}-head {
          position: absolute;
          left: 0;
          top: 0;
          width: 32px;
          height: 32px;
          border-radius: 3px;
          background-color: #f5f5f5;
          background-size: cover;
          background-position: center;
        }
        .${this.listIdPrefix}-name {
          font-size: 13px;
          font-weight: bold;
          color: #333;
          margin-bottom: 6px;
        }
        .${this.listIdPrefix}-text {
          font-size: 12px;
          line-height: 16px;
          word-break: break-all;
          color: #909090;
          margin-bottom: 6px;
        }
        .${this.listIdPrefix}-info {
          display: flex;
          flex-direction: row;
          font-size: 12px;
          color: #ccc;
          margin-bottom: 6px;
        }
        .${this.listIdPrefix}-info-text {
          margin-right: 12px;
        }
        .${this.listIdPrefix}-info-btn {
          cursor: pointer;
          margin-right: 12px;
        }
        .${this.listIdPrefix}-info-btn:hover {
          color: #88f;
        }
        .${this.listIdPrefix}-item-reply {
          border: 1px solid #ccc;
          margin-bottom: 6px;
          padding: 6px 12px;
          line-height: 20px;
          font-size: 12px;
          background: #f6f7f4;
          border-radius: 3px;
        }
        .${this.listIdPrefix}-nomore {
          padding: 24px 0;
          font-size: 12px;
          text-align: center;
          color: #ccc;
        }
        .${this.listIdPrefix}-anchor-name {
          color: #666;
          font-weight: normal;
        }
        .${this.listIdPrefix}-anchor-link {
          color: #9090ff;
          text-decoration: none;
        }
        </style>
        <div class="${this.inputIdPrefix}-main">
          <a name="${this.hashName}" class="${this.inputIdPrefix}-title">评论区</a>
          <div class="${this.inputIdPrefix}-input">
            <div class="${this.inputIdPrefix}-pre">Email</div>
            <input type="emial" id="${this.inputIdPrefix}-email" placeholder="请输入Email，仅用于头像与回复提醒，不会泄露" />
          </div>
          <div class="${this.inputIdPrefix}-input">
            <div class="${this.inputIdPrefix}-pre">昵称</div>
            <input type="nick" id="${this.inputIdPrefix}-nick" placeholder="请输入昵称（选填）" />
          </div>
          <div class="${this.inputIdPrefix}-reply" id="${this.inputIdPrefix}-reply"></div>
          <div style="position: relative;">
            <textarea id="${this.inputIdPrefix}-text" placeholder="请输入评论内容" ></textarea>
          </div>
          <div id="${this.inputIdPrefix}-submit">提交评论</div>
          <div id="${this.listIdPrefix}"></div>
        </div>
        
      `;
      this.getElement();
      this.getDefaultInfo();
    }

    // 获取元素
    getElement() {
      this.element = {
        email: document.getElementById(this.inputIdPrefix+'-email'),
        nick: document.getElementById(this.inputIdPrefix+'-nick'),
        reply: document.getElementById(this.inputIdPrefix+'-reply'),
        text: document.getElementById(this.inputIdPrefix+'-text'),
        submit: document.getElementById(this.inputIdPrefix+'-submit'),
        list: document.getElementById(this.listIdPrefix),
      };
    }

    // 绑定事件
    bindEvent() {
      this.element.submit.onclick = () => {
        const email = this.trim(this.element.email.value);
        const text = this.trim(this.element.text.value);
        const nick = this.trim(this.element.nick.value);
        if (!email) {
          this.displayError('email');
          return;
        }
        localStorage.setItem(EmailStorageKey, email);
        localStorage.setItem(NickStorageKey, nick);
        if (!text) {
          this.displayError('text');
          return;
        }

        this.petList({
          email,
          text,
          nick
        });
      }
      this.element.list.onclick = (e) => {
        const target = e.target;
        if (!target.dataset || !target.dataset.type) {
          return;
        }
        const type = target.dataset.type;
        if (type === 'reply') {
          this.reply(target.dataset);
        }
      }
      this.element.reply.onclick = (e) => {
        const target = e.target;
        if (!target.dataset || !target.dataset.type) {
          return;
        }
        const type = target.dataset.type;
        if (type === 'cancel') {
          this.element.reply.style.display = 'none';
          this.replyId = null;
        }
      }
    }

    // 显示错误信息
    displayError(type) {
      const errBgColor = 'rgb(249, 204, 204)';
      clearTimeout(this.errorTimeout);
      this.element[type].style.backgroundColor = errBgColor;
      this.errorTimeout = setTimeout(() => {
        this.element[type].style.backgroundColor = '#fff';
        this.errorTimeout = setTimeout(() => {
          this.element[type].style.backgroundColor = errBgColor;
          this.errorTimeout = setTimeout(() => {
            this.element[type].style.backgroundColor = '#fff';
          }, 300);
        }, 300);
      }, 300);
    }


    trim(str) {
      return (str || '').replace(/^\\s*|\\s*$/, '');
    }
  
    // 获取存储localstorage的默认信息
    getDefaultInfo() {
      const localStorageEmailData = localStorage.getItem(EmailStorageKey);
      if (localStorageEmailData) {
        this.element.email.value = localStorageEmailData;
      }
      const localStorageNickData = localStorage.getItem(NickStorageKey);
      if (localStorageNickData) {
        this.element.nick.value = localStorageNickData;
      }
      
    }

    // 获取列表
    getList() {
      fetch(`${this.host}/api/commit-list?site=${this.site}&page=${this.page}`).then(response => {
        return response.json();
      }).then(result => {
        this.renderList(result && result.list);
      });
    }

    // 添加评论
    petList(data) {
      if (this.isPuting) {
        return;
      }
      this.isPuting = true;
      data.site = this.site;
      data.page = this.page;
      data.location = location.href;
      if (this.replyId) {
        data.reply = this.replyId;
      }
      const originSubmitText = this.element.submit.innerText;
      this.element.submit.innerText = '提交中...';
      this.element.submit.style.opacity = 0.5;
      fetch(`${this.host}/api/commit-add`, {
        method:'POST',
        headers:{
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(response => {
        this.replyId = null;
        this.element.reply.style.display = 'none';
        this.isPuting = false;
        return response.json();
      }).then(result => {
        console.log('result', result);
        this.element.submit.innerText = originSubmitText;
        this.element.submit.style.opacity = 1;
        this.element.text.value = '';
        if (result && !result.success && result.errmsg) {
          alert(result.errmsg);
        } else {
          this.getList();
        }
      });
    }


    // 渲染列表
    renderList(list) {
      if (!list || !Array.isArray(list)) {
        // no
      }
      this.element.list.innerHTML = list.map((item, index) => {
        const name = this.getName(item);
        const floor = list.length - index;
        const text = this.getText(item.text);
        return `<div class="${this.listIdPrefix}-item">
          
          <div class="${this.listIdPrefix}-head" style="background-image: url('${this.getHeadImg(item)}')"></div>
          <div>
            <div class="${this.listIdPrefix}-name"><a class="${this.listIdPrefix}-anchor-name" name="${this.hashName}-${item.id}">#${floor}</a> ${ name }</div>
            <div class="${this.listIdPrefix}-text">${ text }</div>
            ${ item.reply ? this.renderItemReply(list, item.reply) : ''}
            <div class="${this.listIdPrefix}-info">
              <div class="${this.listIdPrefix}-info-text">${this.getTime(item.createTime)}</div>
              <div class="${this.listIdPrefix}-info-btn" data-floor="${floor}" data-type="reply" data-id="${item.id}" data-replyid="${item.site}:${item.page}:${item.id}" data-name="${name}" data-text="${encodeURI(item.text)}">回复</div>
            </div>
          </div>
        </div>`;
      }).join('') + `<div class="${this.listIdPrefix}-nomore">下面没有更多评论了，Powered by <a href="https://midwayjs.org">Midway</a></div>`;
    }

    // 渲染回复的信息
    renderItemReply(list, replyId) {
      const itemIndex = list.findIndex(item => {
        return `${item.site}:${item.page}:${item.id}` === replyId;
      });
      if (itemIndex < 0) {
        return `<div class="${this.listIdPrefix}-item-reply">评论已被删除</div>`
      }
      const floor = list.length - itemIndex;
      const item = list[itemIndex];
      return `<div class="${this.listIdPrefix}-item-reply">
        <div><a class="${this.listIdPrefix}-anchor-link" href="#${this.hashName}-${item.id}">#${floor}</a> ${this.getName(item)}</div>
        <div>${this.getText(item.text)}</div>
      </div>`
    }

    // 获取用户名
    getName(info) {
      if (info.nick) {
        return info.nick;
      }
      return '匿名';
    }

    // 获取无风险的text
    getText(text) {
      return text.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br />');
    }

    // 回复
    reply(info) {
      this.replyId = info.replyid;
      this.element.reply.innerHTML = `<div>
        <div class="${this.inputIdPrefix}-reply-cancel" data-type="cancel">取消</div>
        <div>回复 <a class="${this.listIdPrefix}-anchor-link" href="#${this.hashName}-${info.id}">#${info.floor}</a> ${info.name} 的评论</div>
        <div>${this.getText(decodeURI(info.text))}</div>
      </div>`
      this.element.reply.style.display = 'block';
    }

    getHeadImg(item) {
      return `https://secure.gravatar.com/avatar/${item.avatar}?size=32`
    }

    getTime(timestamp) {
      const date = new Date(+timestamp);
      return `${date.getFullYear()}/${this.padZero(date.getMonth() + 1)}/${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`
    }

    padZero(str) {
      return ('00' + str).slice(-2)
    }
  }
  
  window.Pcommit = Pcommit;
})();
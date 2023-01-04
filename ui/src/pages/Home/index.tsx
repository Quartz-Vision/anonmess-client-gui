import React, { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { RiMailSendLine, RiMenuLine } from "react-icons/ri";

import SplitBox from 'components/SplitBox';
import styles from './styles.module.scss';
import { sendMessage, EVENT_NEW_MESSAGE, wsEvents, type ChatMessage } from 'services/ws';

const Sidebar = () => {

}

class Message {
  direction: string;
  text: string;

  constructor(direction: "in" | "out", text: string) {
    this.direction = direction;
    this.text = text;
  }
};

const Home = () => {
  const initialChatsScale = useMemo(() => Number(localStorage.getItem('ui.channelScale')), []);
  const setChatsScale = (scale: number) => localStorage.setItem('ui.channelScale', String(scale));
  const [messagesSize, setMessagesSize] = useState(0);
  const messagesDesktopMode = messagesSize > 800;
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageText, setMessageText] = useState("");
  const messagesRef = useRef(messages);

  const addMessage = (msg: Message) => {
    messagesRef.current = [...messagesRef.current, msg];
    setMessages(messagesRef.current);
  }

  useEffect(() => {
    const handler = (msg: ChatMessage) => addMessage(new Message("in", String(msg.text)));
    wsEvents.on(EVENT_NEW_MESSAGE, handler);

    return () => {
      wsEvents.off(EVENT_NEW_MESSAGE, handler)
    };
  }, []);

  const sendClientMessage = () => {
    console.log(1);
    addMessage(new Message("out", messageText));
    sendMessage(messageText);
    setMessageText("");
  };
  
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendClientMessage();
    return false;
  }

  return (
    <SplitBox
      initialScale={initialChatsScale}
      onScale={(scale, _, bSize) => (setChatsScale(scale), setMessagesSize(bSize))}
      componentA={
        <div className={styles.chatsSection}>
          <div className={styles.chatsHeader}>
            <button className={styles.menuButton}>
              <RiMenuLine className={styles.icon}/>
            </button>
            <input type="text" className={styles.chatsSearchBox} placeholder="Search" />
          </div>
          <div className={styles.chatsContent}>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
            <div className={`${styles.chatContainer}`}>
              <div className={styles.chatImage}>ДИ</div>
              <div className={styles.chatInfo}>
                <div className={styles.chatTitle}>Дебил Иванович</div>
                <div className={styles.chatPreview}>Abanbahdn nabahm yoy imabubaht impim in opni pu namos</div>
              </div>
            </div>
          </div>
        </div>
      }
      componentB={
        <div className={`${styles.messagesSection} ${messagesDesktopMode ? styles.desktop : ''}`}>
          <div className={styles.messagesHeader}></div>
          <div className={styles.messagesContent}>
            {messages.map((msg, i) => (
              <div
                className={
                  `${styles.messageContainer
                  } ${styles[msg.direction]
                  } ${messages[i+1]?.direction !== msg.direction ? styles.nextOther : ''
                  } ${messages[i-1]?.direction !== msg.direction ? styles.prevOther : ''
                  }`}
                key={i}
              >
                <div className={styles.message}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form className={styles.messagesFooter} onSubmit={onSubmit}>
            <input
              type="text"
              className={styles.messagesInput}
              placeholder="Write a message..."
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
            />
            <button className={styles.sendButton} type="submit">
              <RiMailSendLine className={styles.icon}/>
            </button>
          </form>
        </div>
      }
    />
  )
}

export default Home;

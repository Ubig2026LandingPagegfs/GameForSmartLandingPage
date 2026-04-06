import Header from "@/components/shared/Header";
import Sidebar from "@/components/shared/Sidebar";

const chatList = [
    { id: 1, name: "Bessie Cooper", lastMsg: "Let’s play now!", time: "2d", online: true, img: "/assets/img/msg-sender1.webp" },
    { id: 2, name: "Ronald Richards", lastMsg: "You:I will go to sleep", time: "17m", online: false, img: "/assets/img/msg-sender2.webp", unread: 3 },
    { id: 3, name: "Robert Fox", lastMsg: "Are you here?", time: "2d", online: true, img: "/assets/img/msg-sender3.webp" },
    { id: 4, name: "Jacob Jones", lastMsg: "Let’s play now!", time: "10m", online: true, img: "/assets/img/msg-sender4.webp", unread: 4 },
    { id: 5, name: "Bessie Cooper", lastMsg: "Let’s play now!", time: "2d", online: false, img: "/assets/img/msg-sender5.webp" },
    { id: 6, name: "Guy Hawkins", lastMsg: "I will go AFK", time: "2d", online: false, img: "/assets/img/msg-sender6.webp" },
];

export default function ChatPage() {
    return (
        <>
            <Header />
            <main className="main-container container-fluid d-flex pt-md-20 pt-sm-15 pt-10 px-0 position-relative">
                <Sidebar />
                <article className="main-content mt-10">
                    <section className="chat-section">
                        <div className="row gx-6">
                            <div className="col-lg-4 col-md-6 col-sm-8 position-relative">
                                <div className="chat-list-area px-lg-6 px-4 py-lg-8 py-4 bgn-4 rounded">
                                    <div className="msg-list-user-info d-between mb-lg-4 mb-2">
                                        <div className="msg-list-user-thumb">
                                            <img className="w-100 rounded-circle" src="/assets/img/player1.webp" alt="user thumb" />
                                        </div>
                                        <div className="msg-list-user-info d-flex gap-6">
                                            <button className="edit-user bttn outline-0">
                                                <i className="ti ti-edit tcn-1 fs-2xl"></i>
                                            </button>
                                            <button className="more-action bttn outline-0">
                                                <i className="ti ti-dots tcn-1 fs-2xl"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="search-chat mb-lg-6 mb-4">
                                        <form action="#">
                                            <div className="input-area d-flex align-items-center gap-3 rounded-4">
                                                <i className="ti ti-search"></i>
                                                <input type="text" placeholder="Search......" className="w-100" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="chat-list-wrapper" data-lenis-prevent>
                                        <ul className="chat-list d-grid gap-lg-6 gap-3">
                                            {chatList.map((chat) => (
                                                <li key={chat.id} className={`chat-item rounded-4 ${chat.id === 2 ? 'active' : ''}`}>
                                                    <a href="#" className="d-between">
                                                        <div className="d-flex align-items-center gap-3">
                                                            <div className="msg-sender-list-thumb position-relative">
                                                                <img className="w-100 rounded-circle" src={chat.img} alt="user thumb" />
                                                                <div className={`online-dot ${chat.online ? 'online' : 'offline'}`}></div>
                                                            </div>
                                                            <div className="msg-list-user-info">
                                                                <span className="fs-five tcn-1 mb-1 d-block">{chat.name}</span>
                                                                <span className="fs-sm tcn-6">{chat.lastMsg}</span>
                                                            </div>
                                                        </div>
                                                        <div className="msg-status text-end">
                                                            <span className={`fs-sm ${chat.unread ? 'tcp-2' : 'tcn-1'} d-block`}>{chat.time}</span>
                                                            {chat.unread && <span className="msg-count fs-sm">{chat.unread}</span>}
                                                        </div>
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="chat-wrapper p-lg-6 p-sm-4 p-2 bgn-4 rounded">
                                    <div className="chat-header d-between pb-xl-8 pb-4 bb">
                                        <div className="d-flex align-items-center gap-2">
                                            <button className="chat-list-toggle-btn bttn d-lg-none">
                                                <i className="ti ti-menu-2 tcn-1 fs-2xl"></i>
                                            </button>
                                            <div className="msg-receiver-user-thumb">
                                                <img className="w-100 rounded-circle" src="/assets/img/msg-sender1.webp" alt="user thumb" />
                                            </div>
                                        </div>
                                        <div className="msg-more-option">
                                            <button className="video-call bttn">
                                                <i className="ti ti-video tcn-6 fs-2xl"></i>
                                            </button>
                                            <button className="audio-call bttn">
                                                <i className="ti ti-phone tcn-6 fs-2xl"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="chat-body py-6" data-lenis-prevent>
                                        <div className="chat-msg-area d-grid gap-lg-6 gap-4 w-100">
                                            <div className="chat-msg sender">
                                                <div className="msg-sender-thumb mb-4">
                                                    <img className="w-100 rounded-circle" src="/assets/img/msg-sender1.webp" alt="user thumb" />
                                                </div>
                                                <div className="msg-content">
                                                    <div className="msg-text">
                                                        <span>Which game you play now?</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="chat-msg receiver ms-auto">
                                                <div className="msg-content mb-4">
                                                    <div className="msg-text text-end">
                                                        <span>Good I will wait you in the game!</span>
                                                    </div>
                                                </div>
                                                <div className="msg-receiver-thumb mt-2 ms-auto">
                                                    <img className="w-100 rounded-circle" src="/assets/img/msg-sender2.webp" alt="user thumb" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="chat-footer bt pt-lg-10 pt-sm-8 pt-6">
                                        <form action="#" className="d-flex align-items-center gap-lg-10 gap-sm-8 gap-4">
                                            <div className="emoji-area d-flex align-items-center gap-lg-5 gap-3">
                                                <button className="add-emoji bttn p-0">
                                                    <i className="ti ti-mood-wink-2 tcn-1 fs-2xl"></i>
                                                </button>
                                                <button className="add-file-btn bttn p-0">
                                                    <i className="ti ti-photo tcn-1 fs-2xl"></i>
                                                </button>
                                            </div>
                                            <div className="input-area d-flex align-items-center gap-3 py-2 pe-2 w-100">
                                                <input type="text" className="w-100 bg-transparent border-0 tcn-1" placeholder="Type your message..." />
                                                <button className="send-msg bttn">
                                                    <i className="ti ti-send tcn-0 fs-2xl"></i>
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </>
    );
}

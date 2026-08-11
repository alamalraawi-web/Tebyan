const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));
const getUsers = () => JSON.parse(localStorage.getItem("tebyan-users") || "[]");
const saveUsers = (users) => localStorage.setItem("tebyan-users", JSON.stringify(users));
export const supabase = {
  auth: {
    async getSession() { return { data: { session: JSON.parse(localStorage.getItem("tebyan-session") || "null") }, error: null }; },
    async signUp({ email, password }) { await wait(); const users=getUsers(); if(users.some(u=>u.email===email)) return {data:{user:null},error:new Error("البريد مستخدم بالفعل")}; const user={id:crypto.randomUUID(),email,password}; users.push(user); saveUsers(users); localStorage.setItem("tebyan-session",JSON.stringify({user})); return {data:{user,session:{user}},error:null}; },
    async signInWithPassword({ email, password }) { await wait(); const user=getUsers().find(u=>u.email===email&&u.password===password); if(!user) return {data:{session:null},error:new Error("invalid login credentials")}; const session={user}; localStorage.setItem("tebyan-session",JSON.stringify(session)); return {data:{session,user},error:null}; },
    async signOut() { localStorage.removeItem("tebyan-session"); return {error:null}; },
    async resend() { await wait(); return {error:null}; },
    async signInWithOAuth() { return {error:new Error("طريقة الدخول هذه غير مفعّلة في النسخة المحلية")}; },
  },
  from() { return { async insert() { return { error: null }; } }; },
  storage: { from() { return { async upload() { return { error: null }; } }; } },
};

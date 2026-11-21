f=require('fs')
D=[[0,-1,'u'],[0,1,'d'],[-1,0,'l'],[1,0,'r']]
N=(c,a,b,W)=>{let x=c%W+a,y=(c/W|0)+b;return x<0||x>=W||y<0?-1:y*W+x}
P=(F,B,s,t,W)=>{if(s==t)return'';let q=[s],p=new Map([[s,-1]]),v=new Map();
for(let h=0;h<q.length;h++){let c=q[h];
for(let[dx,dy,ch]of D){let n=N(c,dx,dy,W);
if(n<0||!F.has(n)||B.has(n)||p.has(n))continue;
p.set(n,c);v.set(n,ch);
if(n==t){let r='',x=n;while(x!=s){r=v.get(x)+r;x=p.get(x)}return r}
q.push(n)}}return null}
S=(C,e,b,g,W)=>{
let F=new Set(C);F.add(e);
let d=g.map(z=>{let m=new Map([[z,0]]),q=[z];
for(let h=0;h<q.length;h++){let c=q[h];
for(let[dx,dy]of D){let n=N(c,dx,dy,W);
if(n>=0&&F.has(n)&&!m.has(n)){m.set(n,m.get(c)+1);q.push(n)}}}
return m});
let L=new Set(g),q=[...g];
for(let h=0;h<q.length;h++){let t=q[h];
for(let[dx,dy]of D){let c=N(t,-dx,-dy,W),a=N(c,-dx,-dy,W);
if(c>=0&&a>=0&&F.has(c)&&F.has(a)&&!L.has(c)){L.add(c);q.push(c)}}}
let n=b.length,pm=[];
(function gen(p,r){if(!r.length){pm.push(p);return}
for(let i=0;i<r.length;i++)gen([...p,r[i]],[...r.slice(0,i),...r.slice(i+1)])})([],[...Array(n).keys()]);
let H=bs=>{let m=1/0;
for(let p of pm){let s=0;
for(let k=0;k<n;k++){let v=d[p[k]].get(bs[k]);if(v==null){s=1/0;break}s+=v}
if(s<m)m=s}
return m};
let A=[],K=0,T=new Map(),Q=new Map(),nd=0;
let pu=i=>{A.push(i);let j=A.length-1;
while(j>0){let k=(j-1)>>1;if(A[k][0]<i[0]||A[k][0]==i[0]&&A[k][1]<i[1])break;A[j]=A[k];j=k}
A[j]=i};
let po=()=>{let t=A[0],l=A.pop();
if(A.length){let i=0;
for(;;){let a=2*i+1,b=a+1,m=a;
if(b<A.length&&(A[b][0]<A[a][0]||A[b][0]==A[a][0]&&A[b][1]<A[a][1]))m=b;
if(m>=A.length)break;
if(A[m][0]<l[0]||A[m][0]==l[0]&&A[m][1]<l[1]){A[i]=A[m];i=m}else break}
A[i]=l}
return t};
let s0={b:[...b].sort((x,y)=>x-y),p:e,g:0};
let key=s=>s.b.join()+'|'+s.p;
let sk=key(s0);T.set(sk,0);Q.set(sk,0);
pu([H(s0.b),K++,0,s0,sk]);
while(A.length){let[, ,w,s,k]=po();
if(w>T.get(k))continue;
if(s.b.every(b=>g.includes(b))){let r='',x=k;
while(Q.get(x)){let[pk,mv]=Q.get(x);r=mv+r;x=pk}
return{moves:r,end:s.p}}
if(++nd>4e5)return null;
let B=new Set(s.b);
for(let i=0;i<n;i++){let b=s.b[i];
for(let[dx,dy,ch]of D){let de=N(b,dx,dy,W);
if(de<0||!C.has(de)||B.has(de)||!L.has(de))continue;
let h2=N(b,-dx,-dy,W);
if(h2<0||!F.has(h2))continue;
let ph=P(F,B,s.p,h2,W);
if(ph===null)continue;
let nb=[...s.b];nb[i]=de;nb.sort((x,y)=>x-y);
let hv=H(nb);if(hv==1/0)continue;
let ns={b:nb,p:b,g:w+1},nk=key(ns);
if(T.has(nk)&&T.get(nk)<=w+1)continue;
T.set(nk,w+1);Q.set(nk,[k,ph+ch]);
pu([w+1+hv,K++,w+1,ns,nk])}}}
return null}
V=txt=>{
let rows=txt.replace(/\r/g,'').split('\n').filter(r=>r.length);
let W=Math.max(...rows.map(r=>r.length)),H=rows.length;
let g=rows.map(r=>[...r.padEnd(W,'#')]);
let px=0,py=0,bx=[],go=[];
for(let y=0;y<H;y++)for(let x=0;x<W;x++){let c=g[y][x];
if(c=='@'||c==='+'){px=x;py=y}
if(c=='$'||c=='*')bx.push(y*W+x);
if(c=='.'||c=='*'||c==='+')go.push(y*W+x)}
let F=new Set();
for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(g[y][x]!='#')F.add(y*W+x);
let sn=new Set(),rm=[];
for(let y=0;y<H;y++)for(let x=0;x<W;x++){let i=y*W+x;
if(y==py||g[y][x]=='#'||sn.has(i))continue;
let cp=new Set(),q=[i];sn.add(i);
for(let h=0;h<q.length;h++){let c=q[h];cp.add(c);
for(let[dx,dy]of D){let n=N(c,dx,dy,W);
if(n>=0&&(n/W|0)!=py&&g[n/W|0][n%W]!='#'&&!sn.has(n)){sn.add(n);q.push(n)}}}
rm.push(cp)}
let inf=rm.map(cp=>{
let bs=[...cp].filter(c=>bx.includes(c)),gs=[...cp].filter(c=>go.includes(c)),dr=-1,en=-1;
for(let c of cp){let y=(c/W|0);if(Math.abs(py-y)!=1)continue;
let n=N(c,0,py-y,W);
if(n>=0&&g[py][n%W]!='#'){dr=c;en=n;break}}
return{cp,bs,gs,dr,en}}).sort((a,b)=>a.dr-b.dr);
let mv='',cu=py*W+px,cb=[...bx];
for(let r of inf){let B=new Set(cb);
let w=P(F,B,cu,r.en,W);
if(w===null)return'';
mv+=w;
let s=S(r.cp,r.en,r.bs,r.gs,W);
if(!s)return'';
mv+=s.moves;cu=s.end;
cb=cb.filter(b=>!r.bs.includes(b)).concat(r.gs)}
return mv}
for(let i=1;i<6;i++){let id='i00'+i;
let t=f.readFileSync('/input/'+id+'/level.txt','utf8'),m=V(t);
f.mkdirSync('/output/'+id,{recursive:!0});
f.writeFileSync('/output/'+id+'/solution.txt',m)}

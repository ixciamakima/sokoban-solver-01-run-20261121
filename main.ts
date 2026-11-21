f=require('fs')
let W,O,C='rldu'
P=(F,B,s,t)=>{if(s==t)return''
let q=[s],a={},b={}
a[s]=1
for(let c of q)for(let i=4;i--;){let n=c+O[i]
if(!F.has(n)||B.has(n)||a[n])continue
a[n]=c+1;b[n]=C[i]
if(n==t){let r='',x=n;while(x!=s){r=b[x]+r;x=a[x]-1}return r}
q.push(n)}
return null}
S=(cp,e,bs,gs)=>{
let F2=new Set(cp);F2.add(e)
let X=gs.map(z=>z%W),Y=gs.map(z=>z/W|0)
let H=a=>{let p=[0],n=a.length
for(let m2=1;m2<1<<n;m2++){p[m2]=1/0
let k=0;for(let t=m2;t;t>>=1)k+=t&1
for(let j=0;j<n;j++)if(m2>>j&1){let v=Math.abs(a[k-1]%W-X[j])+Math.abs((a[k-1]/W|0)-Y[j]);p[m2]=Math.min(p[m2],p[m2^(1<<j)]+v)}}
return p[(1<<n)-1]}
let M={},B=[],m=0,N=0,nd=0
let pu=(fv,st)=>{(B[fv]=B[fv]||[]).push(st);N++}
let po=()=>{if(!N)return null;for(;;m++){let b=B[m];if(b&&b.length){N--;return b.pop()}}}
let s0=bs,h0=H(s0)
let k0=s0.join()+'|'+e
M[k0]=[0]
pu(h0,[s0,e,k0,0])
let st
while(st=po()){
let[bb,p,k,g]=st
if(g>M[k][0])continue
if(bb.every(x=>gs.includes(x))){let r='',x=k
while(M[x][1]){let[,pk,mv]=M[x];r=mv+r;x=pk}
return[r,p]}
if(++nd>4e5)return null
let B2=new Set(bb)
for(let i in bb){let b=bb[i]
for(let j=4;j--;){let o=O[j],de=b+o
if(!cp.has(de)||B2.has(de)||!F2.has(b-o))continue
let ph=P(F2,B2,p,b-o)
if(ph===null)continue
let nb=[...bb];nb[i]=de;nb.sort((x,y)=>x-y)
let hv=H(nb)
let nk=nb.join()+'|'+b,ng=g+1
if(M[nk]&&M[nk][0]<=ng)continue
M[nk]=[ng,k,ph+C[j]]
pu(ng+hv,[nb,b,nk,ng])}}}
return null}
V=t=>{
let r=t.split('\n').filter(x=>x)
W=Math.max(...r.map(x=>x.length))
O=[1,-1,W,-W]
let px=0,py=0,bx=[],go=[],F=new Set()
for(let i=0;i<W*r.length;i++){let y=i/W|0,x=i%W,c=r[y][x]
if(c&&c!='#')F.add(i)
if(c=='@'||c==='+')px=x,py=y
if(c=='$'||c=='*')bx.push(i)
if('.*+'.includes(c))go.push(i)}
let sn=new Set(),rm=[]
for(let i of F){
if((i/W|0)==py||sn.has(i))continue
let cp=new Set(),q=[i],en=-1;sn.add(i)
for(let c of q){cp.add(c)
for(let o of O){let n=c+o
if((n/W|0)==py){if(F.has(n))en=n}else if(F.has(n)&&!sn.has(n)){sn.add(n);q.push(n)}}}
rm.push([cp,en])}
let inf=rm.map(([cp,en])=>{
let bs=bx.filter(c=>cp.has(c)),gs=go.filter(c=>cp.has(c))
return[cp,bs,gs,en]})
let mv='',cu=py*W+px,cb=[...bx]
for(let[cp,bs,gs,en]of inf){
let w=P(F,new Set(cb),cu,en)
if(w===null)return''
mv+=w
let s=S(cp,en,bs,gs)
if(!s)return''
mv+=s[0];cu=s[1]
cb=cb.filter(b=>!bs.includes(b)).concat(gs)}
return mv}
let E=process.env,I=E.MAKEFUN_INPUT_DIR||'/input',O2=E.MAKEFUN_OUTPUT_DIR||'/output'
f.mkdirSync(O2,{recursive:!0})
for(let i=1;i<6;i++){let id='i00'+i
f.mkdirSync(O2+'/'+id)
f.writeFileSync(O2+'/'+id+'/solution.txt',V(f.readFileSync(I+'/'+id+'/level.txt','utf8')))}

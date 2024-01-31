const router = useRouter();

const [transitionStarted, setTransitionStarted] = useState<boolean>(false);

function handleClick() {
  setTransitionStarted(true);

  setTimeout(() => {
    router.push("/next-page");
  }, 500)
}

return (
  <div>
    <Link className="hidden" href="/next-page" />
    <Image 
      className={`duration-500 ${transitionStarted ? "fixed w-full h-full top-0 left-0" : "<initial image sizing and styles>"}`} 
      onClick={handleClick}> 
      src="path-to-image" 
      fill 
      alt="image link" />
  </div>
  
)
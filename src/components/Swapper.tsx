import Box from './Box'
import SwapIcon from './SwapIcon'
import { tokens } from './tokens'

const Swapper : React.FC<any> = ({listShow, onChange, setListShow, inputMint, outputMint, setOutputMint, setInputMint, inAmount , outAmount}) => {
    const handleSwapIcon = () => {
        const temp = inputMint;
        setInputMint(outputMint);
        setOutputMint(temp);
    }
    return (
        <div className={`flex relative w-fit flex-col justify-center items-center rounded-xl`}>
            <Box forData={"input"} onChange={onChange} value={inAmount} setListShow={setListShow} tokenData={tokens[inputMint]} >
                You're Selling
            </Box>
            <hr className='w-[90%] absolute top-1/2 border-[#131B24] '  />
            <SwapIcon onClick={handleSwapIcon}/>
            <Box inAmount={inAmount} forData={"output"} value={outAmount} listShow={listShow} setListShow={setListShow} tokenData={tokens[outputMint]} >
                You're Buying
            </Box>
        </div>
    )
}

export default Swapper
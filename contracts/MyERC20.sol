// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

/**
 * @title MyERC20
 * @dev ERC20 Токен с комиссией за перевод.
 */
contract MyERC20 is ERC20, ERC20Permit, Ownable {
    uint256 public transferFee = 10; // 0.1% fee (10 basis points)

    /**
     * @notice Конструктор контракта токена, присваивающий владельцу токена определенное количество токенов.
     * @param initialOwner Адрес владельца токена.
     */
    constructor(address initialOwner) ERC20("DiMaS", "DMS") ERC20Permit("DiMaS") Ownable(initialOwner) {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }

    /**
     * @notice Перевод токена от отправителя к получателю с комиссией.
     * @param recipient Адрес получателя токена. 
     * @param amount Количество токенов для перевода получателю.
     */
    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        uint256 fee = (amount * transferFee) / 1000;
        uint256 amountAfterFee = amount - fee;
        _transfer(_msgSender(), recipient, amountAfterFee);
        _transfer(_msgSender(), owner(), fee);
        return true;
    }

    /**
     * @notice Переопределение функциии transferFrom для перевода от отправителя с удержанием комисии.
     * @param sender параметр, содержащий адрес отправителя.
     * @param recipient параметр, содержащий адрес получателя.
     * @param amount параметр, содержащий количество токенов для перевода.
     */
    function transferFrom(address sender, address recipient, uint256 amount) public virtual override returns (bool) {
        uint256 fee = (amount * transferFee) / 1000;
        uint256 amountAfterFee = amount - fee;
        _transfer(sender, recipient, amountAfterFee);
        _transfer(sender, owner(), fee);

        uint256 currentAllowance = allowance(sender, _msgSender());
        require(currentAllowance >= amount, "ERC20: transfer amount exceeds allowance");
        _approve(sender, _msgSender(), currentAllowance - amount);

        return true;
    }

    /**
     * @notice Покупка токена за эфир.
     */
    function buy() public payable {
        require(msg.value > 0, "Not a valid tokens value.");
        console.log("msg.value ", msg.value);
        console.log(msg.value);
        console.log("balanceOf(owner()) ", balanceOf(owner()));
        console.log(balanceOf(owner()));
        require(balanceOf(owner()) >= msg.value, "Not enough.");

        _transfer(owner(), msg.sender, msg.value);
    }
}

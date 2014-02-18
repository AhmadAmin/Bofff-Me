var params=
{
	win_boffsList:$.win_boffsList,
};
$.win_boffsList.add(Alloy.createController("contacts",params).getView());
Ti.App.bofffsListTab= $.tab_boffsList;
Ti.App.index=$.win_boffsList;
$.index.open();

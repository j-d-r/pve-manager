Ext.define('PVE.sdn.IpamEditInputPanel', {
    extend: 'Proxmox.panel.InputPanel',
    mixins: ['Proxmox.Mixin.CBind'],

    isCreate: false,

    onGetValues: function(values) {
	let me = this;

	if (!values.vmid) {
	    delete values.vmid;
	}

	return values;
    },

    items: [
	{
	    xtype: 'pmxDisplayEditField',
	    name: 'vmid',
	    fieldLabel: gettext('VMID'),
	    allowBlank: false,
	    editable: false,
	    cbind: {
		hidden: '{isCreate}',
	    },
	},
	{
	    xtype: 'pmxDisplayEditField',
	    name: 'mac',
	    fieldLabel: gettext('MAC'),
	    allowBlank: false,
	    cbind: {
		editable: '{isCreate}',
	    },
	},
	{
	    xtype: 'proxmoxtextfield',
	    name: 'ip',
	    fieldLabel: gettext('IP'),
	    allowBlank: false,
	},
    ],
});

Ext.define('PVE.sdn.IpamEdit', {
    extend: 'Proxmox.window.Edit',

    subject: gettext('DHCP Mapping'),
    width: 350,

    isCreate: false,
    mapping: {},

    submitUrl: function(url, values) {
	return `${url}/${values.zone}/${values.vnet}/${values.mac}`;
    },

    initComponent: function() {
	var me = this;

	me.method = me.isCreate ? 'POST' : 'PUT';

	let ipanel = Ext.create('PVE.sdn.IpamEditInputPanel', {
	    isCreate: me.isCreate,
	});

	Ext.apply(me, {
	    items: [
		ipanel,
	    ],
	});

	me.callParent();

	ipanel.setValues(me.mapping);
    },
});

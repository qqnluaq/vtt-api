( function() {
    'use strict';

    console.log('tampering! list API');

    __doPostBack3 = function(eventDest, eventArgument, eventArgValue) {
        console.log('tampered!');
/*         debugger; */
        var theform = document.formMain;
        theform.destination.value = eventDest;
        theform[""+eventArgument].value = eventArgValue;
        theform.submit();
    };

    document.routeEvent = function () {};
} )();

( function() {
    if ( !window.VTT )
        window.VTT = {};
    
    window.VTT.adjustDateRange = function ( option ) {
        option = $.extend( {
            start: $( '#startDate' ).val(),
            end:   $( '#endDate'   ).val(),
        }, option );
        
        $( '#startDate' ).val( option.start );
        $( '#endDate'   ).val( option.end   );
        
        $( '[value=Refresh]' ).click()
    }
    
    window.VTT.getEntries = function () {
        var out = { entries: [] };

        $( '#Table3 table.small tr' ).each( function ( i, row ) {
            if ( i == 0 ) return;

            var entry = {};

            //"PROJECT DATE HOURS TASK COMMENTS  CHANGE REQUEST"
            var project  = $( row ).find( 'td:nth-child(1) p a' ),
                date     = $( row ).find( 'td:nth-child(2)' ),
                hours    = $( row ).find( 'td:nth-child(3)' ),
                task     = $( row ).find( 'td:nth-child(4)' ),
                comments = $( row ).find( 'td:nth-child(5)' ),
                change   = $( row ).find( 'td:nth-child(6)' );
            
            entry.taskId = project.attr( 'onclick' ).match( /'(\d+)'/ )[ 1 ];
            entry.projectName = project.text();            
            entry.date = date.text();            
            entry.hours = hours.text();
            entry.task = task.text();
            entry.comments = comments.text();
            entry.change = change.text();
      
            out.entries.push( entry )
        } )
        
        out.start = $( '#startDate' ).val();
        out.end = $( '#endDate' ).val();
        
        return out
    }
    
} )();